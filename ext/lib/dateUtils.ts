/**
 * Get today's date key in YYYY-MM-DD format
 * Used as the unique identifier for entries
 */
export function getTodayKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Get "yesterday" for display purposes
 * Returns a human-readable string like "Wednesday, Feb 5"
 */
export function getYesterdayLabel(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
}
