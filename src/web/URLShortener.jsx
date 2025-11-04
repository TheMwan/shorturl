import { useEffect, useMemo, useState } from "react";
import { Link as LinkIcon, Copy, Check, Trash2 } from "lucide-react";
import {
  Container, Card, IconWrapper, IconBg, Title, Subtitle,
  Field, Input, Button, ResultBox, ResultLabel, ResultRow,
  ResultInput, CopyBtn, History, HistoryTitle, HistoryList, HistoryItem,
  LoadingSpinner, Toast, ToastIcon, ClearHistoryBtn, DeleteBtn
} from "./URLShortener.styles";

function normalizeUrl(raw) {
  if (!raw) return "";
  const t = raw.trim();
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function isValidUrl(value) {
  try {
    new URL(normalizeUrl(value));
    return true;
  } catch {
    return false;
  }
}

function shortHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  const base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let out = "";
  do { out = base62[h % 62] + out; h = Math.floor(h / 62); } while (h > 0);
  return out.slice(0, 6);
}

const CACHE_KEY = "urlshort_cache_v1";
const HISTORY_KEY = "urlshort_history_v1";
const SLUG_MAP_KEY = "urlshort_slugmap_v1";

const readCache = () => { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; } };
const writeCache = (obj) => localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
const readHistory = () => { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; } };
const writeHistory = (arr) => localStorage.setItem(HISTORY_KEY, JSON.stringify(arr));
const readSlugMap = () => { try { return JSON.parse(localStorage.getItem(SLUG_MAP_KEY) || "{}"); } catch { return {}; } };
const writeSlugMap = (obj) => localStorage.setItem(SLUG_MAP_KEY, JSON.stringify(obj));

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => readHistory());
  const [showToast, setShowToast] = useState(false);
  const [toastFading, setToastFading] = useState(false);

  const canShorten = useMemo(() => isValidUrl(url), [url]);

  useEffect(() => { if (!shortUrl) setCopied(false); }, [shortUrl]);

  useEffect(() => {
    if (showToast) {
      const a = setTimeout(() => setToastFading(true), 2700);
      const b = setTimeout(() => { setShowToast(false); setToastFading(false); }, 3000);
      return () => { clearTimeout(a); clearTimeout(b); };
    }
  }, [showToast]);

  const handleShorten = async () => {
    if (!canShorten) return;
    setLoading(true);
    const normalized = normalizeUrl(url);
    const id = shortHash(normalized);
    const short = `${window.location.origin}/${id}`;

    const cache = readCache();
    cache[normalized] = short;
    writeCache(cache);

    const slugMap = readSlugMap();
    slugMap[id] = normalized;
    writeSlugMap(slugMap);

    await new Promise(r => setTimeout(r, 500));
    setShortUrl(short);

    const next = [{ long: normalized, short, ts: Date.now(), id }, ...history.filter(h => h.long !== normalized)].slice(0, 10);
    setHistory(next);
    writeHistory(next);
    setLoading(false);
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleDeleteItem = (longUrl) => {
    const item = history.find(h => h.long === longUrl);
    const next = history.filter(h => h.long !== longUrl);
    setHistory(next);
    writeHistory(next);
    if (item?.id) {
      const map = readSlugMap();
      if (map[item.id]) { delete map[item.id]; writeSlugMap(map); }
    }
    const cache = readCache();
    if (cache[longUrl]) { delete cache[longUrl]; writeCache(cache); }
  };

  const handleClearHistory = () => {
    setHistory([]);
    writeHistory([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && canShorten && !loading) handleShorten();
  };

  return (
    <Container>
      <Card>
        <IconWrapper>
          <IconBg>
            <LinkIcon size={32} color="#667eea" />
          </IconBg>
        </IconWrapper>

        <Title>URL Shortener</Title>
        <Subtitle>Make your links shorter and cleaner</Subtitle>

        <Field>
          <Input
            type="url"
            placeholder="Enter your long URL here…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Long URL input"
          />
          <Button onClick={handleShorten} disabled={!canShorten || loading}>
            {loading ? <LoadingSpinner /> : null}
            {loading ? "Shortening" : "Shorten"}
          </Button>
        </Field>

        {shortUrl && (
          <ResultBox>
            <ResultLabel>Your shortened URL</ResultLabel>
            <ResultRow>
              <ResultInput type="text" value={shortUrl} readOnly />
              <CopyBtn onClick={() => handleCopy(shortUrl)} title="Copy to clipboard" aria-label="Copy short URL">
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </CopyBtn>
            </ResultRow>
          </ResultBox>
        )}

        {history.length > 0 && (
          <History>
            <HistoryTitle>
              Recent links
              <ClearHistoryBtn onClick={handleClearHistory}>Clear All</ClearHistoryBtn>
            </HistoryTitle>
            <HistoryList>
              {history.map((item) => (
                <HistoryItem key={item.long}>
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{item.long}</div>
                    <div style={{ color: "#4f46e5", fontSize: 14, fontWeight: 600 }}>{item.short}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <CopyBtn onClick={() => handleCopy(item.short)} aria-label="Copy from history">
                      <Copy size={16} />
                    </CopyBtn>
                    <DeleteBtn onClick={() => handleDeleteItem(item.long)} aria-label="Delete item">
                      <Trash2 size={16} />
                    </DeleteBtn>
                  </div>
                </HistoryItem>
              ))}
            </HistoryList>
          </History>
        )}
      </Card>

      {showToast && (
        <Toast className={toastFading ? "fade-out" : ""}>
          <ToastIcon>
            <Check size={16} />
          </ToastIcon>
          Link copied to clipboard!
        </Toast>
      )}
    </Container>
  );
}
