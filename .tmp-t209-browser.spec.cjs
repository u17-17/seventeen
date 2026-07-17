const { test, expect } = require("@playwright/test");

const baseUrl = process.env.T209_BASE_URL || "http://localhost:4173";
const publicRoutes = ["/", "/tutor", "/story", "/faq", "/classroom", "/cases"];
const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "tablet", width: 768, height: 1100 },
  { name: "mobile", width: 390, height: 1200 },
  { name: "narrow", width: 320, height: 1200 },
];

for (const viewport of viewports) {
  test.describe(`T-209 browser QA ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of [...publicRoutes, "/not-a-real-page-t209"]) {
      test(`${route} renders without runtime errors`, async ({ page }) => {
        const consoleErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message));

        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
        expect(response.status()).toBe(route.includes("not-a-real") ? 404 : 200);
        await expect(page.locator("body")).not.toHaveText("");
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator(".vite-error-overlay, #webpack-dev-server-client-overlay")).toHaveCount(0);

        const hasHorizontalOverflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        expect(hasHorizontalOverflow).toBe(false);
        expect(consoleErrors).toEqual([]);
      });
    }
  });
}

test("T-209 navigation and consultation form work on mobile", async ({ page }) => {
  test.setTimeout(45000);
  await page.setViewportSize({ width: 390, height: 1200 });

  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.locator("a[href='/tutor']").first().click();
  await page.waitForURL(`${baseUrl}/tutor`);
  await expect(page.locator("h1")).toContainText("邯郸闫老师高中数学物理家教");

  await page.goto(`${baseUrl}/#contact`, { waitUntil: "networkidle" });
  await expect(page.locator("body")).toContainText("-L09-29");
  await expect(page.locator("img[alt*='微信']")).toHaveCount(1);

  const gradeOptions = await page.locator("select[name=grade] option").allTextContents();
  expect(gradeOptions.join("|")).toContain("高一");
  expect(gradeOptions.join("|")).toContain("高二");
  expect(gradeOptions.join("|")).toContain("升高一咨询");
  expect(gradeOptions.join("|")).not.toContain("其他");
  expect(gradeOptions.join("|")).not.toContain("高三");

  await page.locator("button", { hasText: "提交" }).click();
  await expect(page.locator("[role=alert]").first()).toBeVisible();
  await expect(page.locator("input[name=privacyConsent]")).not.toBeChecked();

  await page.locator("input[name=guardianName]").fill("测试家长");
  await page.locator("input[name=contact]").fill("wechat-test-000");
  await page.locator("select[name=grade]").selectOption({ label: "高一" });
  await page.locator("select[name=subject]").selectOption({ label: "数学" });
  await page.locator("select[name=deliveryPreference]").selectOption({ label: "涉县线下" });
  await page.locator("textarea[name=mainConcern]").fill("函数基础薄弱，想先做一次学习问题诊断。");
  await page.locator("input[name=privacyConsent]").check();
  await expect(page.locator("input[name=privacyConsent]")).toBeChecked();

  expect(consoleErrors).toEqual([]);
});
