import { format, parseISO, isValid } from "date-fns";

/**
 * Safely format any date value coming from the API.
 * Returns a fallback string if the value is missing or unparseable.
 */
export function formatPostDate(
  date: string | null | undefined,
  pattern = "dd MMM yyyy"
): string {
  if (!date) return "—";

  // Try ISO parse first (most APIs return ISO 8601)
  const parsed = parseISO(date);
  if (isValid(parsed)) return format(parsed, pattern);

  // Fallback: let the JS Date constructor try
  const fallback = new Date(date);
  if (isValid(fallback)) return format(fallback, pattern);

  return "—";
}