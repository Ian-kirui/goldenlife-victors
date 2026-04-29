import { format, parseISO, isValid, parse } from "date-fns";

/**
 * Safely format any date value coming from the API.
 * Handles ISO strings, "yyyy-MM-dd HH:mm:ss" (API format), and Date objects.
 */
export function formatPostDate(
  date: string | null | undefined,
  pattern = "dd MMM yyyy"
): string {
  if (!date) return "—";

  // Try ISO 8601 first
  const iso = parseISO(date);
  if (isValid(iso)) return format(iso, pattern);

  // Try API format: "2026-04-22 15:51:24"
  const custom = parse(date, "yyyy-MM-dd HH:mm:ss", new Date());
  if (isValid(custom)) return format(custom, pattern);

  // Last resort
  const fallback = new Date(date);
  if (isValid(fallback)) return format(fallback, pattern);

  return "—";
}