import { isAngleInRange, getSegmentsAngle } from '@/utlis/checkerMath';

describe('isAngleInRange', () => {
  test('returns true if in range', () => {
    expect(isAngleInRange(15, 20, 10)).toBe(true);
  });

  test('returns false if outside range', () => {
    expect(isAngleInRange(25, 20, 10)).toBe(false);
  });

  test('handles wraparound range correctly (upper)', () => {
    expect(isAngleInRange(355, 10, 350)).toBe(true);
  });

  test('handles wraparound range correctly (lower)', () => {
    expect(isAngleInRange(5, 10, 350)).toBe(true);
  });

  test('returns false for angle outside wraparound', () => {
    expect(isAngleInRange(180, 10, 350)).toBe(false);
  });

  test('normalizes angles above 360', () => {
    expect(isAngleInRange(725, 10, 350)).toBe(true); // 725 % 360 = 5
  });

  test('normalizes negative angles', () => {
    expect(isAngleInRange(-5, 10, 350)).toBe(true); // -5 becomes 355
  });
});

describe('getSegmentsAngle', () => {
  test('returns min 0 max 360 if index 0 with 1 segement', () => {
    let expectedObject = {
      minAngle: 0,
      maxAngle: 360,
    };

    expect(getSegmentsAngle(0, 1)).toStrictEqual(expectedObject);
  });

  test('returns min 0 max 180 if index 0 with 2 segments', () => {
    let expectedObject = {
      minAngle: 0,
      maxAngle: 180,
    };

    expect(getSegmentsAngle(0, 2)).toStrictEqual(expectedObject);
  });

  test('returns min 180 max 0 if index 1 with 2 segments', () => {
    let expectedObject = {
      minAngle: 180,
      maxAngle: 360,
    };

    expect(getSegmentsAngle(1, 2)).toStrictEqual(expectedObject);
  });

  test('returns min 0 max 0 if index 3 with 4 segments', () => {
    let expectedObject = {
      minAngle: 270,
      maxAngle: 360,
    };

    expect(getSegmentsAngle(3, 4)).toStrictEqual(expectedObject);
  });
});
