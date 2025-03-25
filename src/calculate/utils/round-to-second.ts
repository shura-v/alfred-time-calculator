export function roundToSecond(date: Date): Date {
  const ms = date.getTime();
  const rounded = ((ms / 1000) >> 0) * 1000;
  return new Date(rounded);
}
