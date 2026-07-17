import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { entityProfile } from "./entityProfile.js";
import { about, contact, hero } from "./siteData.js";

describe("home page content", () => {
  it("keeps the confirmed teacher identity in the shared entity profile", () => {
    assert.equal(entityProfile.teacher.name, "闫老师");
    assert.equal(entityProfile.teacher.school, "河北师范大学");
    assert.equal(entityProfile.teacher.major, "教育学");
    assert.equal(entityProfile.teacher.displayAge, "22 岁");
    assert.equal(entityProfile.teacher.photoPolicy, "当前不展示教师照片");
  });

  it("clearly presents the teacher, both subjects, grades and service areas", () => {
    const serialized = JSON.stringify({ hero, about });

    for (const requiredFact of [
      entityProfile.teacher.name,
      entityProfile.teacher.school,
      entityProfile.teacher.major,
      entityProfile.teacher.displayAge,
      ...entityProfile.services.subjects,
      ...entityProfile.services.formalGrades,
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
    ]) {
      assert.match(
        serialized,
        new RegExp(requiredFact.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
    }

    assert.equal(serialized.includes("闫奕龙"), false);
    assert.deepEqual(
      about.services.map((service) => service.title),
      entityProfile.services.subjects,
    );
    for (const service of about.services) {
      for (const grade of entityProfile.services.formalGrades) {
        assert.match(service.content, new RegExp(grade));
      }
    }
  });

  it("uses an explicit non-photo identity card without requesting a missing avatar", () => {
    const componentSource = readFileSync(
      new URL("../components/AboutSection.jsx", import.meta.url),
      "utf8",
    );

    assert.match(about.photoNote, /不展示.*照片/);
    assert.equal(componentSource.includes("teacher-avatar.jpg"), false);
    assert.equal(componentSource.includes("<img"), false);
  });

  it("does not hard-code confirmed identity facts in the hero component", () => {
    const componentSource = readFileSync(
      new URL("../components/HeroDissolve.jsx", import.meta.url),
      "utf8",
    );

    for (const sharedFact of [
      entityProfile.teacher.displayAge,
      entityProfile.teacher.school,
      entityProfile.teacher.major,
      ...entityProfile.services.formalGrades,
    ]) {
      assert.equal(
        componentSource.includes(sharedFact),
        false,
        `HeroDissolve should read ${sharedFact} from siteData`,
      );
    }
  });

  it("describes the approved minimal consultation information and WeChat fallback", () => {
    const serialized = JSON.stringify(contact);
    const formSource = readFileSync(
      new URL("../components/forms/ConsultationForm.jsx", import.meta.url),
      "utf8",
    );
    const contactSectionSource = readFileSync(
      new URL("../components/ContactSection.jsx", import.meta.url),
      "utf8",
    );

    for (const required of [
      "年级",
      "咨询科目",
      "授课偏好",
      "成绩区间",
      "主要问题",
      "可沟通时间",
      entityProfile.contact.wechatId,
      entityProfile.contact.qrPath,
    ]) {
      assert.match(serialized, new RegExp(required));
    }

    assert.equal(serialized.includes("目标分数"), false);
    assert.equal(serialized.includes("精确分数"), false);
    assert.match(serialized, /所填联系方式/);
    assert.match(serialized, /不同意.*表单.*微信/);
    assert.match(formSource, /所填联系方式/);
    assert.match(contactSectionSource, /所填联系方式/);
    assert.doesNotMatch(`${formSource}${contactSectionSource}`, /提交成功后会通过微信|通过微信联系你/);
  });
});
