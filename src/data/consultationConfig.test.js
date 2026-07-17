import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { consultationConfig } from "./consultationConfig.js";
import { entityProfile } from "./entityProfile.js";

describe("consultation configuration", () => {
  it("defines the approved minimal field options", () => {
    assert.equal(consultationConfig.grades, entityProfile.services.consultationGrades);
    assert.deepEqual(consultationConfig.subjects, [
      "数学",
      "物理",
      "数学和物理",
      "暂不确定",
    ]);
    assert.deepEqual(consultationConfig.deliveryPreferences, [
      "涉县线下",
      "邯郸线上",
      "暂不确定",
    ]);
    assert.deepEqual(consultationConfig.scoreRanges, [
      "60 以下",
      "60—79",
      "80—99",
      "100—119",
      "120 及以上",
    ]);
    assert.equal(consultationConfig.grades.includes("其他"), false);
  });

  it("contains the complete approved privacy notice and technical limits", () => {
    const notice = consultationConfig.privacyNotice;

    for (const required of [
      entityProfile.teacher.name,
      "高中数学、物理家教咨询",
      "Resend",
      "私人通知邮箱",
      "最后一次咨询沟通后 90 天内删除",
      entityProfile.contact.wechatId,
      "查阅、更正、删除或撤回同意",
      "家长或监护人",
      "学生姓名、学校、班级、详细地址",
    ]) {
      assert.match(notice, new RegExp(required));
    }

    assert.equal(consultationConfig.maxBodyBytes, 8 * 1024);
    assert.equal(consultationConfig.minimumFillTimeMs, 3000);
    assert.deepEqual(consultationConfig.allowedOrigins, [entityProfile.website.origin]);
  });

  it("renders only approved client field names", () => {
    const source = readFileSync(
      new URL("../components/forms/ConsultationForm.jsx", import.meta.url),
      "utf8",
    );

    for (const requiredName of [
      "guardianName",
      "contact",
      "grade",
      "subject",
      "deliveryPreference",
      "scoreRange",
      "mainConcern",
      "availability",
      "privacyConsent",
      "website",
    ]) {
      assert.match(source, new RegExp(`name=["']${requiredName}["']`));
    }

    assert.doesNotMatch(source, /name=["']currentScore["']/);
    assert.doesNotMatch(source, /name=["']targetScore["']/);
    assert.match(source, /咨询表单个人信息说明/);
    assert.match(source, /id=["']guardianContact["']/);
    assert.match(source, /inputId=["']guardianContact["']/);
  });
});
