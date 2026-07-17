import { useEffect } from "react";
import { applySeo } from "../utils/seo.js";

export default function Seo({ page, notFound = false }) {
  useEffect(() => {
    applySeo(page, notFound);
  }, [notFound, page]);

  return null;
}
