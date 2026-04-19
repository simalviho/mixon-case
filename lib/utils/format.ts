export function formatRelativeDays(value: number | null): string {
  if (value === null) {
    return "Completed";
  }

  if (value === 0) {
    return "Today";
  }

  if (value === 1) {
    return "1 day";
  }

  return `${value} days`;
}

export function formatDateLabel(value: string): string {
  const parsedDate = new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}
