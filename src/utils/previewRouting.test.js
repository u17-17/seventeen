import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { resolvePreviewRequest } from "../../scripts/preview-routing.mjs";

describe("production preview routing", () => {
  const distDir = path.resolve("dist");
  const existingFiles = new Set([
    path.join(distDir, "assets", "app.js"),
    path.join(distDir, "robots.txt"),
  ]);
  const fileExists = (filePath) => existingFiles.has(filePath);

  it("serves known static routes with their prerendered HTML", () => {
    const result = resolvePreviewRequest("/tutor?source=test", {
      distDir,
      fileExists,
    });

    assert.deepEqual(result, {
      status: 200,
      filePath: path.join(distDir, "tutor", "index.html"),
    });
  });

  it("leaves existing static files to the Vite file server", () => {
    assert.equal(
      resolvePreviewRequest("/assets/app.js", { distDir, fileExists }),
      null,
    );
    assert.equal(
      resolvePreviewRequest("/robots.txt", { distDir, fileExists }),
      null,
    );
  });

  it("serves the static error document with status 404 for unknown paths", () => {
    for (const requestPath of ["/unknown-page", "/missing-image.png", "/%E0%A4%A"]) {
      assert.deepEqual(
        resolvePreviewRequest(requestPath, { distDir, fileExists }),
        { status: 404, filePath: path.join(distDir, "404.html") },
      );
    }
  });
});
