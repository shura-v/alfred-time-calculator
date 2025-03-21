const formatSeconds = (x: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(x);

export function humanizeDuration(seconds: number) {
  if (Number.isNaN(seconds)) {
    throw new TypeError("second argument must be a number");
  }

  const d = Math.floor(seconds / 86_400);
  const h = Math.floor((seconds % 86_400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [
    d > 0 ? `${d} day${d > 1 ? "s" : ""}` : "",
    h > 0 ? `${h} hour${h > 1 ? "s" : ""}` : "",
    m > 0 ? `${m} minute${m > 1 ? "s" : ""}` : "",
    s === 0 ? "" : `${formatSeconds(s)} second${s > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");
}
