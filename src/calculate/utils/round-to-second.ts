export function roundToSecond(date: Date): Date {
  const ms = date.getTime();
  const rounded = Math.round(ms / 1000) * 1000;
  return new Date(rounded);
}
