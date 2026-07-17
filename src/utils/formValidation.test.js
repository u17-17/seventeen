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
      deliveryPreference: "",
      scoreRange: "",
      mainConcern: "",
      availability: "",
      privacyConsent: false,
    });

    assert.equal(result.valid, false);
    assert.equal(result.errors.guardianName, undefined);
    assert.equal(result.errors.contact, "请填写手机号或微信号");
    assert.equal(result.errors.grade, "请选择学生年级");
    assert.equal(result.errors.subject, "请选择咨询科目");
    assert.equal(result.errors.deliveryPreference, "请选择授课偏好");
    assert.equal(result.errors.mainConcern, "请简单描述学生当前问题");
    assert.equal(result.errors.availability, undefined);
    assert.equal(result.errors.privacyConsent, "请阅读并同意个人信息说明");
  });

  it("rejects values outside the approved options and length limits", () => {
    const result = validateConsultationForm({
      guardianName: "家".repeat(31),
      contact: "abc",
      grade: "高三",
      subject: "化学",
      deliveryPreference: "邯郸全市线下",
      scoreRange: "满分",
      mainConcern: "不会",
      availability: "凌晨两点",
      privacyConsent: true,
    });

    assert.equal(result.valid, false);
    assert.equal(result.errors.guardianName, "联系人称呼最多 30 个字");
    assert.equal(result.errors.contact, "联系方式至少 5 个字符");
    assert.equal(result.errors.grade, "请选择有效的学生年级");
    assert.equal(result.errors.subject, "请选择有效的咨询科目");
    assert.equal(result.errors.deliveryPreference, "请选择有效的授课偏好");
    assert.equal(result.errors.scoreRange, "请选择有效的成绩区间");
    assert.equal(result.errors.mainConcern, "问题描述至少 8 个字");
    assert.equal(result.errors.availability, "请选择有效的可沟通时间");
  });

  it("accepts the required fields while optional fields stay empty", () => {
    const result = validateConsultationForm({
      guardianName: "",
      contact: "test-wechat-001",
      grade: "高一",
      subject: "数学",
      deliveryPreference: "涉县线下",
      scoreRange: "",
      mainConcern: "函数题听得懂，但是自己做题没有切入点。",
      availability: "",
      privacyConsent: true,
    });

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, {});
  });

  it("caps contact and problem text at the approved maximum lengths", () => {
    const result = validateConsultationForm({
      contact: "x".repeat(51),
      grade: "高二",
      subject: "物理",
      deliveryPreference: "邯郸线上",
      scoreRange: "80—99",
      mainConcern: "问".repeat(501),
      availability: "需要再沟通",
      privacyConsent: true,
    });

    assert.equal(result.errors.contact, "联系方式最多 50 个字符");
    assert.equal(result.errors.mainConcern, "问题描述最多 500 个字");
  });
});
