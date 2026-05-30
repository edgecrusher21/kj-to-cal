import { kJtoCal } from './converter';

describe('kJtoCal', () => {
  it('converts 0 kJ to 0 Cal', () => {
    expect(kJtoCal(0)).toBe(0);
  });

  it('converts 4.184 kJ to 1 Cal', () => {
    expect(kJtoCal(4.184)).toBe(1);
  });

  it('converts 836 kJ to 199.8 Cal (rounded to 1 decimal)', () => {
    expect(kJtoCal(836)).toBe(199.8);
  });

  it('handles negative values', () => {
    expect(kJtoCal(-4.184)).toBe(-1);
  });

  it('rounds to 1 decimal place', () => {
    expect(kJtoCal(10)).toBe(2.4);
  });
});
