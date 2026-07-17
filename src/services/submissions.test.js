import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildConsultationMessage,
  buildDiagnosisPayload,
  copyTextWithFallback,
  createSubmissionRequestId,
} from "./submissions.js";

describe("consultation message generation", () => {
  it("builds a WeChat-ready consultation message", () => {
    const message = buildConsultationMessage({
      guardianName: "测试家长",
      contact: "test-wechat-001",
      grade: "高一",
      subject: "数学",
      deliveryPreference: "涉县线下",
      scoreRange: "80—99",
      mainConcern: "函数题听得懂，但是自己做题没有切入点。",
      availability: "周六下午",
    });

    assert.equal(
      message,
      [
        "【学习诊断咨询】",
        "学生年级：高一",
        "咨询科目：数学",
        "授课偏好：涉县线下",
        "当前成绩区间：80—99",
        "主要问题：函数题听得懂，但是自己做题没有切入点。",
        "可沟通时间：周六下午",
        "联系方式：test-wechat-001",
        "联系人称呼：测试家长",
      ].join("\n"),
    );
    assert.doesNotMatch(message, /目标分数|学生姓名|学校|班级/);
  });

  it("uses placeholders for optional fields", () => {
    const message = buildConsultationMessage({
      contact: "test-contact-002",
      grade: "高二",
      subject: "物理",
      deliveryPreference: "邯郸线上",
      mainConcern: "模型题容易乱，想先做一次问题诊断。",
    });

    assert.match(message, /当前成绩区间：暂未填写/);
    assert.match(message, /可沟通时间：暂未填写/);
    assert.match(message, /联系人称呼：暂未填写/);
  });

  it("builds the API payload with the real honeypot and anti-repeat context", () => {
    const payload = buildDiagnosisPayload(
      {
        guardianName: "测试家长",
        contact: "test-wechat-003",
        grade: "升高一咨询",
        subject: "暂不确定",
        deliveryPreference: "暂不确定",
        scoreRange: "",
        mainConcern: "希望先了解高中学习方式变化和需要准备的内容。",
        availability: "需要再沟通",
        privacyConsent: true,
        website: "bot-filled.example",
      },
      {
        source: "/",
        formStartedAt: 1000,
        requestId: "00000000-0000-4000-8000-000000000001",
      },
    );

    assert.deepEqual(payload, {
      guardianName: "测试家长",
      contact: "test-wechat-003",
      grade: "升高一咨询",
      subject: "暂不确定",
      deliveryPreference: "暂不确定",
      scoreRange: "",
      problem: "希望先了解高中学习方式变化和需要准备的内容。",
      availableTime: "需要再沟通",
      privacyConsent: true,
      source: "/",
      website: "bot-filled.example",
      formStartedAt: 1000,
      requestId: "00000000-0000-4000-8000-000000000001",
    });
  });

  it("creates a stable request id through the supplied crypto implementation", () => {
    const requestId = createSubmissionRequestId({
      randomUUID: () => "00000000-0000-4000-8000-000000000002",
    });

    assert.equal(requestId, "00000000-0000-4000-8000-000000000002");
  });

  it("uses navigator.clipboard when available", async () => {
    const writes = [];
    const result = await copyTextWithFallback("hello", {
      clipboard: { writeText: async (value) => writes.push(value) },
      prompt: () => assert.fail("prompt should not be called"),
    });

    assert.equal(result, true);
    assert.deepEqual(writes, ["hello"]);
  });

  it("falls back to prompt when clipboard is unavailable", async () => {
    const prompts = [];
    const result = await copyTextWithFallback("hello", {
      clipboard: null,
      prompt: (label, value) => prompts.push([label, value]),
    });

    assert.equal(result, false);
    assert.deepEqual(prompts, [["请复制以下内容：", "hello"]]);
  });
});
