export function needsVerification(lastVerified: string, today = new Date()): boolean {
  const checked = Date.parse(`${lastVerified}T00:00:00Z`);
  const currentDay = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return currentDay - checked > 180 * 24 * 60 * 60 * 1000;
}
