import { isValidTimeFormat } from './common';

describe('isValidTimeFormat', () => {
  it('should return true for valid time format HH:MM:SS', () => {
    expect(isValidTimeFormat('23:59:59')).toBe(true);
    expect(isValidTimeFormat('00:00:00')).toBe(true);
    expect(isValidTimeFormat('12:30:45')).toBe(true);
  });

  it('should return false for invalid time format', () => {
    expect(isValidTimeFormat('24:00:00')).toBe(false);
    expect(isValidTimeFormat('12:60:00')).toBe(false); 
    expect(isValidTimeFormat('12:00:60')).toBe(false);
    expect(isValidTimeFormat('12:30')).toBe(false);
    expect(isValidTimeFormat('123:45:67')).toBe(false);
  });
});