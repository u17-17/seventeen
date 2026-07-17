import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  authorizedReviews,
  faqGroups,
  learningResources,
  verifiedCases,
} from "./contentData.js";
import { entityProfile } from "./entityProfile.js";
import { pageNavItems, staticPages } from "./pageData.js";

const requiredPages = ["tutor", "story", "faq", "classroom", "cases"];

describe("static page data", () => {
  it("exposes crawlable trust-building pages in navigation order", () => {
    assert.deepEqual(
      pageNavItems.map((item) => item.href),
      requiredPages.map((slug) => `/${slug}`),
    );
  });

  it("provides usable page metadata and content sections", () => {
    for (const slug of requiredPages) {
      const page = staticPages[slug];

      assert.ok(page, `${slug} page should exist`);
      assert.equal(page.slug, slug);
      assert.ok(page.title.length > 0, `${slug} title should be present`);
      assert.ok(page.subtitle.length > 0, `${slug} subtitle should be present`);
      assert.ok(page.sections.length > 0, `${slug} should have content sections`);
    }
  });

  it("provides a complete canonical tutor entity page without unapproved claims", () => {
    const page = staticPages.tutor;
    const serialized = JSON.stringify(page);

    assert.equal(page.slug, "tutor");
    assert.equal(page.title, entityProfile.canonicalName);
    assert.match(page.subtitle, /涉县/);
    assert.match(page.subtitle, /邯郸市全地区线上/);

    for (const required of [
      entityProfile.teacher.name,
      ...entityProfile.services.subjects,
      ...entityProfile.services.formalGrades,
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
      "一对一学习诊断",
      "2026.03 - 2026.06",
      "阶段测评提升约 20 分",
      "个体结果不代表普遍承诺",
      entityProfile.contact.wechatId,
      "/faq",
      "/cases",
      "/#contact",
    ]) {
      assert.match(serialized, new RegExp(required.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }

    assert.equal(serialized.includes("高三"), false);
    assert.equal(serialized.includes("邯郸全市均可线下"), false);
    assert.equal(serialized.includes("保证提分"), false);
    assert.equal(serialized.includes("元/"), false);
    assert.equal(serialized.includes("概念层"), false);
    assert.equal(serialized.includes("表征层"), false);
  });

  it("presents separate mathematics and physics services for both formal grades", () => {
    const serviceSection = staticPages.tutor.sections.find(
      (section) => section.title === "高中数学、物理服务说明",
    );

    assert.ok(serviceSection, "tutor page should contain a dedicated service section");
    assert.deepEqual(
      serviceSection.items.slice(0, 2).map((item) => item.title),
      entityProfile.services.subjects,
    );

    for (const service of serviceSection.items.slice(0, 2)) {
      for (const grade of entityProfile.services.formalGrades) {
        assert.match(service.content, new RegExp(grade));
      }
    }
  });

  it("shows the confirmed teacher identity on the story page without a photo", () => {
    const serialized = JSON.stringify(staticPages.story);

    for (const teacherFact of [
      entityProfile.teacher.name,
      entityProfile.teacher.school,
      entityProfile.teacher.major,
      entityProfile.teacher.displayAge,
      entityProfile.teacher.photoPolicy,
    ]) {
      assert.match(
        serialized,
        new RegExp(teacherFact.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      );
    }
    assert.equal(serialized.includes("闫奕龙"), false);
    assert.match(serialized, /不展示.*照片/);
    assert.match(serialized, /当前展示年龄为 22 岁/);
  });

  it("states exact offline and online areas on the tutor, story and FAQ pages", () => {
    for (const slug of ["tutor", "story", "faq"]) {
      const serialized = JSON.stringify(staticPages[slug]);

      assert.match(serialized, new RegExp(entityProfile.services.offlineArea));
      assert.match(serialized, new RegExp(entityProfile.services.onlineArea));
    }
  });

  it("links the teacher introduction and canonical tutor page in both directions", () => {
    const tutorContent = JSON.stringify(staticPages.tutor.sections);
    const storyContent = JSON.stringify(staticPages.story.sections);

    assert.match(tutorContent, /"href":"\/story"/);
    assert.match(storyContent, /"href":"\/tutor"/);
  });

  it("reads confirmed teacher facts from entityProfile instead of duplicating them", () => {
    const source = readFileSync(new URL("./pageData.js", import.meta.url), "utf8");

    for (const teacherFact of [
      entityProfile.teacher.school,
      entityProfile.teacher.major,
      entityProfile.teacher.displayAge,
    ]) {
      assert.equal(
        source.includes(teacherFact),
        false,
        `pageData should read ${teacherFact} from entityProfile`,
      );
    }
  });

  it("builds the cases page only from approved cases and authorized reviews", () => {
    const page = staticPages.cases;
    const serialized = JSON.stringify(page);
    const caseSection = page.sections.find(
      (section) => section.title === "经核验的匿名案例",
    );
    const reviewSection = page.sections.find(
      (section) => section.title === "已获授权的匿名反馈",
    );

    assert.deepEqual(
      caseSection.items.map((item) => item.evidenceId),
      verifiedCases.map((item) => item.evidenceId),
    );
    assert.deepEqual(
      reviewSection.items.map((item) => item.authorizationId),
      authorizedReviews.map((item) => item.authorizationId),
    );

    for (const requiredLink of ["/tutor", "/faq", "/#contact"]) {
      assert.match(serialized, new RegExp(requiredLink.replace("/", "\\/")));
    }

    assert.equal(serialized.includes('"images"'), false);
    assert.equal(serialized.includes("/cases/formula-derivation"), false);
    assert.equal(serialized.includes("/cases/solid-geometry"), false);
    assert.equal(serialized.includes("公式不是背出来的"), false);
    assert.equal(serialized.includes("立体几何不是念答案"), false);
  });

  it("uses the confirmed FAQ collection without page-local copies", () => {
    assert.equal(staticPages.faq.sections, faqGroups);
  });

  it("reuses shared consultation and price answers on the tutor page", () => {
    const tutorFaq = staticPages.tutor.sections.find(
      (section) => section.title === "常见问题",
    );
    const sharedFaqItems = faqGroups.flatMap((group) => group.items);
    const expectedIds = ["FAQ-SERVICE-003", "FAQ-EVIDENCE-003"];

    assert.deepEqual(
      tutorFaq.items.slice(0, 2).map((item) => item.faqId),
      expectedIds,
    );

    for (const [index, faqId] of expectedIds.entries()) {
      assert.equal(
        tutorFaq.items[index],
        sharedFaqItems.find((item) => item.faqId === faqId),
      );
    }
  });

  it("uses the existing classroom route as a metadata-rich learning content index", () => {
    const navItem = pageNavItems.find((item) => item.href === "/classroom");
    const page = staticPages.classroom;
    const serialized = JSON.stringify(page);
    const resourceSection = page.sections.find(
      (section) => section.title === "学习主题摘要",
    );

    assert.equal(navItem.label, "学习内容");
    assert.equal(page.title, "学习内容");
    assert.equal(page.showVisual, false);
    assert.deepEqual(
      resourceSection.items.map((item) => item.resourceId),
      learningResources.map((item) => item.resourceId),
    );

    for (const item of resourceSection.items) {
      assert.equal(item.author, entityProfile.teacher.name);
      assert.equal(item.updatedAt, "2026-07-15");
      assert.match(item.contentFamilyId, /^FAM-/);
      assert.equal(item.status, "主题摘要");
      assert.equal(item.href, null);
    }

    assert.equal(serialized.includes("板书占位"), false);
    assert.equal(serialized.includes("上课截图"), false);
  });

  it("keeps T-102A teaching-tool details out of T-205 pages", () => {
    const serialized = JSON.stringify({
      cases: staticPages.cases,
      faq: staticPages.faq,
      classroom: staticPages.classroom,
    });

    for (const forbidden of [
      "四层错因诊断表",
      "概念层",
      "表征层",
      "方法层",
      "执行层",
    ]) {
      assert.equal(serialized.includes(forbidden), false);
    }
  });

  it("does not expose duplicate booking or post-sale feedback pages", () => {
    assert.equal(staticPages.booking, undefined);
    assert.equal(staticPages.feedback, undefined);
    assert.equal(pageNavItems.some((item) => item.href.includes("booking")), false);
    assert.equal(pageNavItems.some((item) => item.href.includes("feedback")), false);
  });
});
