import { useEffect } from "react";
import { applySeo } from "../utils/seo.js";

export default function Seo({ page }) {
  useEffect(() => {
    applySeo(page);
  }, [page]);

  return null;
}
