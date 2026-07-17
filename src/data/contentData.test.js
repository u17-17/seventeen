import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { entityProfile } from "./entityProfile.js";
import { experiences, testimonials } from "./siteData.js";
import {
  authorizedReviews,
  faqGroups,
  learningResources,
  verifiedCases,
} from "./contentData.js";

describe("verified public content", () => {
  it("contains only the two approved anonymous case records", () => {
    assert.deepEqual(
      verifiedCases.map((item) => item.evidenceId),
      ["CASE-EVID-001", "CASE-EVID-002"],
    );

    for (const item of verifiedCases) {
      assert.equal(item.evidenceStatus, "已确认");
      assert.match(item.result, /阶段测评提升约 20 分/);
      assert.equal(item.disclaimer, "个体结果不代表普遍承诺。");
      assert.ok(item.problem.length > 0);
      assert.ok(item.method.length > 0);
      assert.ok(item.publicSummary.length > 0);
    }
  });

  it("keeps case copy anonymous and free of identifying student details", () => {
    const serialized = JSON.stringify(verifiedCases);

    for (const forbidden of [
      "男生",
      "女生",
      "学生姓名",
      "学生学校",
      "学生班级",
      "学生手机号",
      "学生微信号",
      "详细地址",
    ]) {
      assert.equal(serialized.includes(forbidden), false, `${forbidden} must stay private`);
    }
  });

  it("contains only the three confirmed review authorizations", () => {
    assert.deepEqual(
      authorizedReviews.map((item) => item.authorizationId),
      ["REVIEW-AUTH-001", "REVIEW-AUTH-002", "REVIEW-AUTH-003"],
    );
    assert.equal(
      authorizedReviews.every((item) => item.authorizationStatus === "已确认"),
      true,
    );
    assert.match(authorizedReviews[2].quote, /帮助孩子/);
    assert.equal(authorizedReviews[2].quote.includes("帮他"), false);
  });

  it("drives homepage cases and reviews from the verified collections", () => {
    assert.deepEqual(
      experiences.items.slice(0, 2).map((item) => item.evidenceId),
      verifiedCases.map((item) => item.evidenceId),
    );
    assert.equal(testimonials.items, authorizedReviews);
  });

  it("defines FAQ groups from confirmed service, evidence and privacy boundaries", () => {
    assert.deepEqual(
      faqGroups.map((group) => group.title),
      ["服务与安排", "案例、效果与边界"],
    );

    const serialized = JSON.stringify(faqGroups);
    for (const required of [
      ...entityProfile.services.formalGrades,
      ...entityProfile.services.subjects,
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
      "个体结果不代表普遍承诺",
      "已获得公开授权",
      "不公开具体课时价格",
    ]) {
      assert.match(serialized, new RegExp(required));
    }
  });

  it("provides a file-based learning content framework without inventing URLs", () => {
    assert.deepEqual(
      learningResources.map((item) => item.resourceId),
      ["LEARN-001", "LEARN-002", "LEARN-003"],
    );

    for (const item of learningResources) {
      assert.match(item.contentFamilyId, /^FAM-/);
      assert.equal(item.author, entityProfile.teacher.name);
      assert.equal(item.updatedAt, "2026-07-15");
      assert.equal(item.status, "主题摘要");
      assert.equal(item.href, null);
      assert.ok(item.title.length > 0);
      assert.ok(item.summary.length > 0);
      assert.ok(item.audience.length > 0);
      assert.ok(item.topic.length > 0);
      assert.ok(item.sourceIds.length > 0);
      assert.deepEqual(item.outline, [
        "问题与适用场景",
        "判断与处理步骤",
        "边界、来源与下一步",
      ]);
    }
  });

  it("keeps unconfirmed teaching-tool details out of FAQ and learning content", () => {
    const serialized = JSON.stringify({ faqGroups, learningResources });

    for (const forbidden of [
      "四层错因诊断表",
      "概念层",
      "表征层",
      "方法层",
      "执行层",
      "高三",
      "邯郸全市均可线下",
    ]) {
      assert.equal(serialized.includes(forbidden), false);
    }
  });
});
