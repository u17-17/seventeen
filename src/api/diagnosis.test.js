import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createDiagnosisHandler } from "../../api/diagnosis.js";
import { consultationConfig } from "../data/consultationConfig.js";
import { entityProfile } from "../data/entityProfile.js";

const now = Date.parse("2026-07-15T12:00:00.000Z");
const validEnv = Object.freeze({
  RESEND_API_KEY: "test-resend-key",
  FROM_EMAIL: "test-sender@example.com",
  NOTIFY_EMAIL: "test-notify@example.com",
  NODE_ENV: "production",
});

const validBody = Object.freeze({
  guardianName: "测试家长",
  contact: "test-wechat-001",
  grade: "高一",
  subject: "数学",
  deliveryPreference: "涉县线下",
  scoreRange: "80—99",
  problem: "函数题能听懂，但独立做题时不知道第一步。",
  availableTime: "周六下午",
  privacyConsent: true,
  source: "/",
  website: "",
  formStartedAt: now - 5000,
  requestId: "00000000-0000-4000-8000-000000000101",
});

function createRequest(overrides = {}) {
  return {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "seventeen-yan.cn",
      origin: entityProfile.website.origin,
      ...(overrides.headers ?? {}),
    },
    body: overrides.body ?? JSON.stringify(validBody),
    ...overrides,
  };
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function createHarness(options = {}) {
  const sends = [];
  const logs = [];
  const sendEmail =
    options.sendEmail ??
    (async (payload, requestOptions) => {
      sends.push([payload, requestOptions]);
      return { data: { id: "email-test-001" }, error: null };
    });
  const logger = {
    info: (...args) => logs.push(["info", ...args]),
    warn: (...args) => logs.push(["warn", ...args]),
    error: (...args) => logs.push(["error", ...args]),
  };
  const handler = createDiagnosisHandler({
    env: options.env ?? validEnv,
    logger,
    now: () => now,
    randomUUID: () => "00000000-0000-4000-8000-000000000199",
    sendEmail,
  });

  return { handler, logs, sends };
}

async function invoke(handler, requestOverrides = {}) {
  const request = createRequest(requestOverrides);
  const response = createResponse();
  await handler(request, response);
  return response;
}

describe("diagnosis API", () => {
  it("accepts only POST and advertises the allowed method", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, { method: "GET" });

    assert.equal(response.statusCode, 405);
    assert.equal(response.headers.Allow, "POST");
    assert.equal(sends.length, 0);
  });

  it("requires an application/json request", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, {
      headers: { "content-type": "text/plain", host: "seventeen-yan.cn" },
    });

    assert.equal(response.statusCode, 415);
    assert.equal(sends.length, 0);
  });

  it("rejects a foreign origin even when the Host header is valid", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, {
      headers: {
        "content-type": "application/json",
        host: "seventeen-yan.cn",
        origin: "https://malicious.example",
      },
    });

    assert.equal(response.statusCode, 403);
    assert.equal(sends.length, 0);
  });

  it("allows local development origins outside production", async () => {
    const { handler } = createHarness({
      env: { ...validEnv, NODE_ENV: "development" },
    });
    const response = await invoke(handler, {
      headers: {
        "content-type": "application/json",
        host: "127.0.0.1:3000",
        origin: "http://localhost:5173",
      },
    });

    assert.equal(response.statusCode, 200);
  });

  it("rejects request bodies larger than 8 KB", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, {
      body: JSON.stringify({ ...validBody, problem: "x".repeat(consultationConfig.maxBodyBytes) }),
    });

    assert.equal(response.statusCode, 413);
    assert.equal(sends.length, 0);
  });

  it("rejects malformed JSON", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, { body: "{not-json" });

    assert.equal(response.statusCode, 400);
    assert.equal(sends.length, 0);
  });

  it("rejects non-object JSON and unsafe source values", async () => {
    const bodies = [
      "null",
      "[]",
      JSON.stringify({ ...validBody, source: "/\ntest-wechat-in-source" }),
    ];

    for (const body of bodies) {
      const { handler, logs, sends } = createHarness();
      const response = await invoke(handler, { body });

      assert.equal(response.statusCode, 400);
      assert.equal(sends.length, 0);
      assert.doesNotMatch(JSON.stringify(logs), /test-wechat-in-source/);
    }
  });

  it("enforces server-side option allowlists and privacy consent", async () => {
    const invalidBodies = [
      { ...validBody, grade: "高三" },
      { ...validBody, subject: "化学" },
      { ...validBody, deliveryPreference: "邯郸全市线下" },
      { ...validBody, scoreRange: "满分" },
      { ...validBody, availableTime: "凌晨两点" },
      { ...validBody, privacyConsent: false },
    ];

    for (const body of invalidBodies) {
      const { handler, sends } = createHarness();
      const response = await invoke(handler, { body: JSON.stringify(body) });
      assert.equal(response.statusCode, 400);
      assert.equal(sends.length, 0);
    }
  });

  it("silently accepts honeypot submissions without sending email", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, {
      body: JSON.stringify({ ...validBody, website: "bot.example" }),
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { success: true });
    assert.equal(sends.length, 0);
  });

  it("blocks submissions completed faster than the approved minimum", async () => {
    const { handler, sends } = createHarness();
    const response = await invoke(handler, {
      body: JSON.stringify({ ...validBody, formStartedAt: now - 500 }),
    });

    assert.equal(response.statusCode, 400);
    assert.equal(sends.length, 0);
  });

  it("sends escaped minimal data with a stable Resend idempotency key", async () => {
    const { handler, logs, sends } = createHarness();
    const response = await invoke(handler, {
      body: JSON.stringify({
        ...validBody,
        guardianName: "<测试家长>",
        problem: "<script>测试</script>函数题第一步仍然不清楚。",
      }),
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, {
      success: true,
      requestId: validBody.requestId,
    });
    assert.equal(sends.length, 1);

    const [payload, requestOptions] = sends[0];
    assert.equal(requestOptions.idempotencyKey, `diagnosis-${validBody.requestId}`);
    assert.match(payload.html, /&lt;测试家长&gt;/);
    assert.match(payload.html, /&lt;script&gt;测试&lt;\/script&gt;/);
    assert.match(payload.text, /授课偏好：涉县线下/);
    assert.match(payload.text, /当前成绩区间：80—99/);
    assert.match(payload.text, /隐私同意：已明确同意/);
    assert.doesNotMatch(`${payload.subject}${payload.html}${payload.text}`, /目标分数/);

    const serializedLogs = JSON.stringify(logs);
    assert.doesNotMatch(serializedLogs, /test-wechat-001/);
    assert.doesNotMatch(serializedLogs, /函数题第一步/);
  });

  it("fails clearly when required email configuration is missing", async () => {
    const { handler, sends } = createHarness({
      env: { ...validEnv, NOTIFY_EMAIL: "" },
    });
    const response = await invoke(handler);

    assert.equal(response.statusCode, 503);
    assert.match(response.body.error, new RegExp(entityProfile.contact.wechatId));
    assert.equal(sends.length, 0);
  });

  it("returns a WeChat fallback when Resend reports an error", async () => {
    const { handler } = createHarness({
      sendEmail: async () => ({
        data: null,
        error: { name: "validation_error", message: "test failure" },
      }),
    });
    const response = await invoke(handler);

    assert.equal(response.statusCode, 502);
    assert.match(response.body.error, new RegExp(entityProfile.contact.wechatId));
    assert.equal(response.body.requestId, validBody.requestId);
  });
});
