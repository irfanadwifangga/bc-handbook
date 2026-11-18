import { describe, expect, test } from 'bun:test';
import { needsVerification } from '../src/utils/verification';

describe('batas umur verifikasi', () => {
  const today = new Date('2026-11-18T23:59:59Z');
  test('tepat 180 hari belum usang', () => {
    expect(needsVerification('2026-05-22', today)).toBe(false);
  });
  test('181 hari memerlukan verifikasi ulang', () => {
    expect(needsVerification('2026-05-21', today)).toBe(true);
  });
  test('tanggal hari ini dan masa depan belum usang', () => {
    expect(needsVerification('2026-11-18', today)).toBe(false);
    expect(needsVerification('2026-11-19', today)).toBe(false);
  });
});
