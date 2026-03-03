import { getAngularVelocityFromPan, normalizeDelta } from '@/utlis/spinnerMath';

type Point = { x: number; y: number };
type Velocity = { vx: number; vy: number };

describe('getAngularVelocityFromPan', () => {
  test('returns 0 when position is (effectively) at center (radiusSquared tiny)', () => {
    const center: Point = { x: 100, y: 100 };

    // position == center => radiusSquared = 0 => guard returns 0
    const position: Point = { x: 100, y: 100 };
    const velocity: Velocity = { vx: 500, vy: 500 };

    expect(getAngularVelocityFromPan(position, velocity, center)).toBe(0);
  });

  test('returns ~0 when velocity is purely radial (moving directly away from center)', () => {
    const center: Point = { x: 0, y: 0 };
    const position: Point = { x: 10, y: 0 }; // radius along +x

    // Purely radial: velocity along +x (same direction as radius)
    const velocity: Velocity = { vx: 100, vy: 0 };

    const omega = getAngularVelocityFromPan(position, velocity, center);

    // Should be exactly 0 with this math, but allow tiny float error
    expect(omega).toBeCloseTo(0, 10);
  });

  test('positive omega for tangential motion in one direction', () => {
    const center: Point = { x: 0, y: 0 };
    const position: Point = { x: 10, y: 0 }; // radius along +x

    // Tangential at that point is along +y
    const velocity: Velocity = { vx: 0, vy: 100 };

    // tangentialVelocity = radiusX*vy - radiusY*vx = 10*100 - 0 = 1000
    // radiusSquared = 100
    // omegaRadians = 1000/100 = 10 rad/s
    // omegaDegrees = 10 * 180/pi
    const expected = 10 * (180 / Math.PI);

    const omega = getAngularVelocityFromPan(position, velocity, center);

    expect(omega).toBeCloseTo(expected, 6);
    expect(omega).toBeGreaterThan(0);
  });

  test('negative omega for tangential motion in the opposite direction', () => {
    const center: Point = { x: 0, y: 0 };
    const position: Point = { x: 10, y: 0 }; // radius along +x

    // Tangential opposite is along -y
    const velocity: Velocity = { vx: 0, vy: -100 };

    const expected = -10 * (180 / Math.PI);

    const omega = getAngularVelocityFromPan(position, velocity, center);

    expect(omega).toBeCloseTo(expected, 6);
    expect(omega).toBeLessThan(0);
  });

  test('increasing radius decreases omega magnitude for same tangential speed (omega ~ 1/r)', () => {
    const center: Point = { x: 0, y: 0 };

    const v: Velocity = { vx: 0, vy: 100 }; // tangential for points on +x axis

    const omegaR10 = getAngularVelocityFromPan({ x: 10, y: 0 }, v, center);
    const omegaR20 = getAngularVelocityFromPan({ x: 20, y: 0 }, v, center);

    // With same tangential velocity, omega should halve when radius doubles
    expect(omegaR20).toBeCloseTo(omegaR10 / 2, 6);
  });

  test('translation invariance: shifting position and center by same offset gives same omega', () => {
    const centerA: Point = { x: 0, y: 0 };
    const positionA: Point = { x: 10, y: 0 };
    const velocity: Velocity = { vx: 0, vy: 100 };

    const omegaA = getAngularVelocityFromPan(positionA, velocity, centerA);

    // Shift both by +1000, +500
    const centerB: Point = { x: 1000, y: 500 };
    const positionB: Point = { x: 1010, y: 500 };

    const omegaB = getAngularVelocityFromPan(positionB, velocity, centerB);

    expect(omegaB).toBeCloseTo(omegaA, 10);
  });

  test('handles mixed vx/vy correctly (matches manual formula)', () => {
    const center: Point = { x: 0, y: 0 };
    const position: Point = { x: 3, y: 4 }; // radiusSquared = 25
    const velocity: Velocity = { vx: 7, vy: 11 };

    // tangentialVelocity = rx*vy - ry*vx = 3*11 - 4*7 = 33 - 28 = 5
    // omegaRadians = 5/25 = 0.2
    // omegaDegrees = 0.2 * 180/pi
    const expected = 0.2 * (180 / Math.PI);

    const omega = getAngularVelocityFromPan(position, velocity, center);

    expect(omega).toBeCloseTo(expected, 10);
  });
});

describe('normalizeDelta', () => {
  test('returns value unchanged when already within [-180, 180]', () => {
    expect(normalizeDelta(0)).toBe(0);
    expect(normalizeDelta(90)).toBe(90);
    expect(normalizeDelta(-90)).toBe(-90);
    expect(normalizeDelta(180)).toBe(180);
    expect(normalizeDelta(-180)).toBe(-180);
  });

  test('wraps values just above 180', () => {
    expect(normalizeDelta(181)).toBe(-179);
    expect(normalizeDelta(190)).toBe(-170);
    expect(normalizeDelta(359)).toBe(-1);
  });

  test('wraps values just below -180', () => {
    expect(normalizeDelta(-181)).toBe(179);
    expect(normalizeDelta(-190)).toBe(170);
    expect(normalizeDelta(-359)).toBe(1);
  });

  test('handles large positive values (single wrap only)', () => {
    expect(normalizeDelta(540)).toBe(180); // 540 - 360 = 180
  });

  test('handles large negative values (single wrap only)', () => {
    expect(normalizeDelta(-540)).toBe(-180); // -540 + 360 = -180
  });
});
