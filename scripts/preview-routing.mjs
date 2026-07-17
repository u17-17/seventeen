import { existsSync, statSync } from "node:fs";
import path from "node:path";
import {
  getNotFoundOutputPath,
  getOutputPathForRoute,
  getStaticRouteForPath,
} from "./prerender-static.mjs";

function isFile(filePath) {
  return existsSync(filePath) && statSync(filePath).isFile();
}

export function resolvePreviewRequest(requestUrl, options = {}) {
  const distDir = path.resolve(options.distDir ?? "dist");
  const fileExists = options.fileExists ?? isFile;
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(requestUrl, "http://preview.local").pathname);
  } catch {
    return { status: 404, filePath: getNotFoundOutputPath(distDir) };
  }

  const route = getStaticRouteForPath(pathname);
  if (route) {
    return {
      status: 200,
      filePath: path.resolve(getOutputPathForRoute(route.path, distDir)),
    };
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const staticFilePath = path.resolve(distDir, relativePath);
  const staysInsideDist =
    staticFilePath === distDir || staticFilePath.startsWith(`${distDir}${path.sep}`);

  if (staysInsideDist && fileExists(staticFilePath)) return null;

  return { status: 404, filePath: getNotFoundOutputPath(distDir) };
}
