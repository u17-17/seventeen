function normalizeHostname(hostname) {
  return String(hostname ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\[/, "")
    .replace(/\]$/, "");
}

function isPrivateIpv4(hostname) {
  const match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) return false;

  const octets = match.slice(1).map(Number);
  if (octets.some((part) => part < 0 || part > 255)) return false;

  const [first, second] = octets;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168) ||
    (first === 198 && (second === 18 || second === 19))
  );
}

export function shouldLoadVercelAnalytics(hostname) {
  const normalized = normalizeHostname(hostname);
  if (!normalized) return false;

  return (
    normalized !== "localhost" &&
    normalized !== "::1" &&
    !normalized.endsWith(".localhost") &&
    !normalized.endsWith(".local") &&
    !isPrivateIpv4(normalized)
  );
}
