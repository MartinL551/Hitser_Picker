type SegmentAngles = {
  minAngle: number;
  maxAngle: number;
};

export function isAngleInRange(angle: number, max: number, min: number): boolean {
  angle %= 360;

  if (min <= max) {
    return min <= angle && max >= angle;
  } else {
    return angle >= min || angle <= max;
  }
}

export function getSegmentsAngle(index: number, totalSegments: number): SegmentAngles {
  const degreesPerSegment = 360 / totalSegments;
  const minAngle = index * degreesPerSegment;
  const maxAngle = (index + 1) * degreesPerSegment;

  return {
    minAngle: minAngle,
    maxAngle: maxAngle,
  };
}
