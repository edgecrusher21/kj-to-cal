// ABOUTME: Parses the kJ input string into a valid number or null.
// ABOUTME: Rejects empty, non-finite, negative, and partially-parsed values.

export function parseKjInput(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}