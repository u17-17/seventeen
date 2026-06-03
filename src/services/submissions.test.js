import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildConsultationMessage,
  copyTextWithFallback,
} from "./submissions.js";

describe("consultation message generation", () => {
  it("builds a WeChat-ready consultation message", () => {
    const message = buildConsultationMessage({
      guardianName: "李女士",
      contact: "13800138000",
      grade: "高一",
      subject: "数学",
      currentScore: "86",
      targetScore: "110",
      mainConcern: "函数题听得懂，但是自己做题没有切入点。",
      availability: "周六下午",
    });

    assert.equal(
      message,
      [
        "【学习诊断咨询】",
        "学生年级：高一",
        "咨询科目：数学",
        "当前分数：86",
        "目标分数：110",
        "主要问题：函数题听得懂，但是自己做题没有切入点。",
        "可上课时间：周六下午",
        "联系方式：13800138000",
        "家长称呼：李女士",
      ].join("\n"),
    );
  });

  it("uses placeholders for optional empty score fields", () => {
    const message = buildConsultationMessage({
      guardianName: "李女士",
      contact: "L09-29",
      grade: "高二",
      subject: "物理",
      mainConcern: "模型题容易乱，想先做一次问题诊断。",
      availability: "平时晚上",
    });

    assert.match(message, /当前分数：暂未填写/);
    assert.match(message, /目标分数：暂未填写/);
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
