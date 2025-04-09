const formatSeconds = (x: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(x);

export function humanizeDuration(seconds: number): string {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);

  const d = Math.floor(absSeconds / 86_400);
  const h = Math.floor((absSeconds % 86_400) / 3600);
  const m = Math.floor((absSeconds % 3600) / 60);
  const s = absSeconds % 60;

  const parts = [
    d > 0 ? `${d} day${d !== 1 ? "s" : ""}` : "",
    h > 0 ? `${h} hour${h !== 1 ? "s" : ""}` : "",
    m > 0 ? `${m} minute${m !== 1 ? "s" : ""}` : "",
    s > 0 ? `${formatSeconds(s)} second${s !== 1 ? "s" : ""}` : "",
  ].filter(Boolean);

  if (parts.length === 0) {
    return "0 seconds";
  }

  return (isNegative ? "-" : "") + parts.join(", ");
}
