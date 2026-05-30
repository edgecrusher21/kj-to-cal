export function kJtoCal(kJ: number): number {
  const cal = kJ / 4.184;
  return Math.round(cal * 10) / 10;
}
