import { format } from "date-fns";

export function formatDate(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy 'at' HH:mm");
}
