import { randomUUID as createRandomUUID } from "node:crypto";
import { Resend } from "resend";
import { consultationConfig } from "../src/data/consultationConfig.js";
import { entityProfile } from "../src/data/entityProfile.js";
import { validateConsultationForm } from "../src/utils/formValidation.js";

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

class DeliveryError extends Error {
  constructor() {
    super("Email delivery failed");
    this.name = "DeliveryError";
  }
}

function text(value) {
  return String(value ?? "").trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getHeader(req, name) {
  const headers = req.headers;
  if (!headers) return "";
  if (typeof headers.get === "function") return text(headers.get(name));

  const normalizedName = name.toLowerCase();
  const value = headers[normalizedName] ?? headers[name];
  return Array.isArray(value) ? text(value[0]) : text(value);
}

function normalizeOrigin(value, protocol = "https:") {
  const normalized = text(value);
  if (!normalized) return "";

  try {
    const url = normalized.includes("://")
      ? new URL(normalized)
      : new URL(`${protocol}//${normalized}`);
    return url.origin;
  } catch {
    return "";
  }
}

function isLocalOrigin(origin) {
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  } catch {
    return false;
  }
}

function getAllowedOrigins(env) {
  const origins = new Set(consultationConfig.allowedOrigins);
  const siteOrigin = normalizeOrigin(env.SITE_URL);
  const vercelOrigin = normalizeOrigin(env.VERCEL_URL);

  if (siteOrigin) origins.add(siteOrigin);
  if (vercelOrigin) origins.add(vercelOrigin);
  return origins;
}

function isAllowedRequestOrigin(req, env) {
  const allowedOrigins = getAllowedOrigins(env);
  const originHeader = normalizeOrigin(getHeader(req, "origin"));
  const isProduction = env.NODE_ENV === "production" || env.VERCEL_ENV === "production";

  if (originHeader) {
    if (allowedOrigins.has(originHeader)) return true;
    return !isProduction && isLocalOrigin(originHeader);
  }

  const hostOrigin = normalizeOrigin(getHeader(req, "host"));
  if (!hostOrigin) return false;
  if (allowedOrigins.has(hostOrigin)) return true;
  return !isProduction && isLocalOrigin(hostOrigin);
}

async function readJsonBody(req) {
  let rawBody;

  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") rawBody = req.body;
    else if (Buffer.isBuffer(req.body)) rawBody = req.body.toString("utf8");
    else rawBody = JSON.stringify(req.body);
  } else {
    const chunks = [];
    let totalBytes = 0;

    for await (const chunk of req) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      totalBytes += buffer.length;
      if (totalBytes > consultationConfig.maxBodyBytes) {
        throw new HttpError(413, "请求内容过大");
      }
      chunks.push(buffer);
    }

    rawBody = Buffer.concat(chunks).toString("utf8");
  }

  if (Buffer.byteLength(rawBody, "utf8") > consultationConfig.maxBodyBytes) {
    throw new HttpError(413, "请求内容过大");
  }

  if (!rawBody) throw new HttpError(400, "请求内容不能为空");

  let parsedBody;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    throw new HttpError(400, "请求内容格式不正确");
  }

  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    throw new HttpError(400, "请求内容格式不正确");
  }

  return parsedBody;
}

function normalizeRequestBody(body, nowValue, fallbackRequestId) {
  const requestId = text(body.requestId) || fallbackRequestId;
  if (!/^[A-Za-z0-9][A-Za-z0-9-]{15,79}$/.test(requestId)) {
    throw new HttpError(400, "请求编号不正确");
  }

  const formStartedAt = Number(body.formStartedAt);
  if (
    !Number.isFinite(formStartedAt) ||
    nowValue - formStartedAt < consultationConfig.minimumFillTimeMs
  ) {
    throw new HttpError(400, "提交过快，请稍后重试");
  }

  const source = text(body.source);
  if (
    source.length > consultationConfig.limits.source ||
    (source && !/^\/[A-Za-z0-9/_-]*$/.test(source))
  ) {
    throw new HttpError(400, "来源页面不正确");
  }

  const formValues = {
    guardianName: text(body.guardianName),
    contact: text(body.contact),
    grade: text(body.grade),
    subject: text(body.subject),
    deliveryPreference: text(body.deliveryPreference),
    scoreRange: text(body.scoreRange),
    mainConcern: text(body.problem),
    availability: text(body.availableTime),
    privacyConsent: body.privacyConsent === true,
  };
  const validation = validateConsultationForm(formValues);
  if (!validation.valid) throw new HttpError(400, "提交信息不符合要求");

  return {
    ...formValues,
    requestId,
    source: source || "直接访问",
  };
}

function createEmailPayload(values, nowValue, env) {
  const scoreRangeDisplay = values.scoreRange || "未提供";
  const guardianNameDisplay = values.guardianName || "未提供";
  const availableTimeDisplay = values.availability || "未提供";
  const submittedAt = new Date(nowValue).toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
  });
  const rows = [
    ["联系人称呼", guardianNameDisplay],
    ["家长微信号或手机号", values.contact],
    ["学生年级", values.grade],
    ["咨询科目", values.subject],
    ["授课偏好", values.deliveryPreference],
    ["当前成绩区间", scoreRangeDisplay],
    ["学生当前主要问题", values.mainConcern],
    ["可沟通时间", availableTimeDisplay],
    ["隐私同意", "已明确同意"],
    ["请求编号", values.requestId],
    ["提交时间", submittedAt],
    ["来源页面", values.source],
  ];
  const htmlRows = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 14px;background:#f5faf7;font-weight:600;color:#1a3a30;border:1px solid #d4e8da;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border:1px solid #d4e8da;color:#2d2d2d;word-break:break-word;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;">
<div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<div style="background:#1a3a30;padding:20px 28px;">
<h1 style="margin:0;font-size:18px;color:#fff;font-weight:700;">YAN TUTOR 新家教咨询</h1>
</div>
<div style="padding:24px 28px;">
<table style="width:100%;border-collapse:collapse;">${htmlRows}</table>
</div>
</div>
</body>
</html>`;
  const plainText = [
    "YAN TUTOR 新家教咨询",
    "─".repeat(30),
    ...rows.map(([label, value]) => `${label}：${value}`),
  ].join("\n");

  return {
    from: env.FROM_EMAIL,
    to: env.NOTIFY_EMAIL,
    subject: `YAN TUTOR 新家教咨询｜${values.grade}｜${values.subject}｜${values.deliveryPreference}`,
    html,
    text: plainText,
  };
}

function getMissingEmailConfig(env) {
  return ["RESEND_API_KEY", "FROM_EMAIL", "NOTIFY_EMAIL"].filter(
    (key) => !text(env[key]),
  );
}

function fallbackMessage(prefix = "提交失败") {
  return `${prefix}，请直接添加微信 ${entityProfile.contact.wechatId}。`;
}

export function createDiagnosisHandler(options = {}) {
  const env = options.env ?? process.env;
  const logger = options.logger ?? console;
  const now = options.now ?? Date.now;
  const randomUUID = options.randomUUID ?? createRandomUUID;
  const sendEmail =
    options.sendEmail ??
    (async (payload, requestOptions) => {
      const resend = new Resend(env.RESEND_API_KEY);
      return resend.emails.send(payload, requestOptions);
    });

  return async function diagnosisHandler(req, res) {
    let requestId = randomUUID();

    if (req.method !== "POST") {
      res.setHeader?.("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed" });
    }

    try {
      const contentType = getHeader(req, "content-type").toLowerCase();
      if (!contentType.startsWith("application/json")) {
        throw new HttpError(415, "只接受 JSON 请求");
      }
      if (!isAllowedRequestOrigin(req, env)) {
        throw new HttpError(403, "请求来源不被允许");
      }

      const body = await readJsonBody(req);
      if (text(body.website)) {
        logger.info?.("diagnosis submission", {
          requestId,
          outcome: "honeypot_suppressed",
        });
        return res.status(200).json({ success: true });
      }

      const values = normalizeRequestBody(body, now(), requestId);
      requestId = values.requestId;

      const missingConfig = getMissingEmailConfig(env);
      if (missingConfig.length > 0) {
        logger.error?.("diagnosis submission", {
          requestId,
          outcome: "configuration_missing",
          fields: missingConfig,
        });
        return res.status(503).json({
          error: fallbackMessage("服务暂时不可用"),
          requestId,
        });
      }

      const emailPayload = createEmailPayload(values, now(), env);
      const delivery = await sendEmail(emailPayload, {
        idempotencyKey: `diagnosis-${requestId}`,
      });
      if (delivery?.error || !delivery?.data?.id) throw new DeliveryError();

      logger.info?.("diagnosis submission", {
        requestId,
        outcome: "sent",
        source: values.source,
      });
      return res.status(200).json({ success: true, requestId });
    } catch (error) {
      if (error instanceof HttpError) {
        logger.warn?.("diagnosis submission", {
          requestId,
          outcome: "rejected",
          status: error.status,
        });
        return res.status(error.status).json({ error: error.message, requestId });
      }

      const status = error instanceof DeliveryError ? 502 : 500;
      logger.error?.("diagnosis submission", {
        requestId,
        outcome: error instanceof DeliveryError ? "delivery_failed" : "unexpected_error",
        errorName: text(error?.name) || "Error",
      });
      return res.status(status).json({ error: fallbackMessage(), requestId });
    }
  };
}

export default createDiagnosisHandler();
