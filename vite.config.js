import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePreviewRequest } from "./scripts/preview-routing.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function staticRoutePreview() {
  return {
    name: "static-route-preview",
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        if (!["GET", "HEAD"].includes(request.method)) {
          next();
          return;
        }

        const resolved = resolvePreviewRequest(request.url, {
          distDir: path.join(projectRoot, "dist"),
        });
        if (!resolved || !existsSync(resolved.filePath)) {
          next();
          return;
        }

        response.statusCode = resolved.status;
        response.setHeader("Content-Type", "text/html; charset=utf-8");

        if (request.method === "HEAD") {
          response.end();
          return;
        }

        createReadStream(resolved.filePath).pipe(response);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), staticRoutePreview()],
});
