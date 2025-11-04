import { useEffect } from "react";
import URLShortener from "./web/URLShortener";

const SLUG_MAP_KEY = "urlshort_slugmap_v1";

function readSlugMap() {
  try { return JSON.parse(localStorage.getItem(SLUG_MAP_KEY) || "{}"); }
  catch { return {}; }
}

export default function App() {
  useEffect(() => {
    const slug = window.location.pathname.replace(/^\//, "");
    if (!slug) return;
    const map = readSlugMap();
    const longUrl = map[slug];
    if (longUrl) {
      window.location.replace(longUrl);
        }
        
  }, []);

  return <URLShortener />;
}
