import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { validateConsultationForm } from "./formValidation.js";

describe("consultation form validation", () => {
  it("requires the core information needed for an appointment consultation", () => {
    const result = validateConsultationForm({
      guardianName: "",
      contact: "",
      grade: "",
      subject: "",
      mainConcern: "",
      availability: "",
    });

    assert.equal(result.valid, false);
    assert.equal(result.errors.guardianName, "请填写家长称呼");
    assert.equal(result.errors.contact, "请填写手机号或微信号");
    assert.equal(result.errors.grade, "请选择学生年级");
    assert.equal(result.errors.subject, "请选择咨询科目");
    assert.equal(result.errors.mainConcern, "请简单描述学生当前问题");
    assert.equal(result.errors.availability, "请选择或填写可沟通时间");
  });

  it("validates score and concern length when optional details are provided", () => {
    const result = validateConsultationForm({
      guardianName: "李女士",
      contact: "abc",
      grade: "高一",
      subject: "数学",
      currentScore: "180",
      targetScore: "-1",
      mainConcern: "不会",
      availability: "周六上午",
    });

    assert.equal(result.valid, false);
    assert.equal(result.errors.contact, "联系方式至少 5 个字符");
    assert.equal(result.errors.currentScore, "当前分数需在 0-150 之间");
    assert.equal(result.errors.targetScore, "目标分数需在 0-150 之间");
    assert.equal(result.errors.mainConcern, "问题描述至少 8 个字");
  });

  it("accepts a complete consultation form", () => {
    const result = validateConsultationForm({
      guardianName: "李女士",
      contact: "13800138000",
      grade: "高一",
      subject: "数学",
      currentScore: "86",
      targetScore: "110",
      mainConcern: "函数题听得懂，但是自己做题没有切入点。",
      availability: "周六下午",
    });

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, {});
  });
});
