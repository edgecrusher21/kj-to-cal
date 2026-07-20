// ABOUTME: Spec for parseKjInput — converts the user's raw TextInput string into
// ABOUTME: either a valid non-negative finite kJ number, or null when invalid.

import { parseKjInput } from './input';

describe('parseKjInput', () => {
  it('returns null for an empty string', () => {
    expect(parseKjInput('')).toBeNull();
  });

  it('returns null for whitespace-only input', () => {
    expect(parseKjInput('   ')).toBeNull();
  });

  it('returns 0 for "0"', () => {
    expect(parseKjInput('0')).toBe(0);
  });

  it('returns the parsed integer for a plain integer', () => {
    expect(parseKjInput('12')).toBe(12);
  });

  it('returns the parsed decimal for a decimal value', () => {
    expect(parseKjInput('4.184')).toBe(4.184);
  });

  it('accepts valid scientific notation like 1e10', () => {
    expect(parseKjInput('1e10')).toBe(1e10);
  });

  it('returns null for "Infinity"', () => {
    expect(parseKjInput('Infinity')).toBeNull();
  });

  it('returns null for "-Infinity"', () => {
    expect(parseKjInput('-Infinity')).toBeNull();
  });

  it('returns null for a negative number', () => {
    expect(parseKjInput('-5')).toBeNull();
  });

  it('returns null when the input has trailing non-numeric characters', () => {
    expect(parseKjInput('12abc')).toBeNull();
  });

  it('returns null when the input has multiple decimal points', () => {
    expect(parseKjInput('1.2.3')).toBeNull();
  });

  it('returns null for non-numeric input', () => {
    expect(parseKjInput('abc')).toBeNull();
  });
});