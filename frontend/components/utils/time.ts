/** Converts a "MM:SS" or "HHH:MM" style string (e.g. "173:00") into total seconds. */
export function toSeconds(value: string): number {
  const parts = value.split(":").map(Number);
  if (parts.some(Number.isNaN)) return 0;

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}

/** Returns a 0-100 watch progress percentage, preferring the explicit field when present. */
export function getProgressPercent(watchedPercent: number, elapsed: string, total: string): number {
  if (watchedPercent > 0) return watchedPercent;

  const totalSeconds = toSeconds(total);
  if (totalSeconds <= 0) return 0;

  return (toSeconds(elapsed) / totalSeconds) * 100;
}