import { 
    MIN_RADIUS_SQUARED 
} from '../constants/spinner';

type Point = {
  x: number;
  y: number;
};

type Velocity = {
  vx: number;
  vy: number;
};

export function getAngularVelocityFromPan(position: Point, velocity: Velocity, center: Point): number {
  'worklet';

  const radiusX = position.x - center.x;
  const radiusY = position.y - center.y;

  const radiusSquared = radiusX * radiusX + radiusY * radiusY;

  if (radiusSquared < MIN_RADIUS_SQUARED) {
    return 0;
  }

  const tangentialVelocity = radiusX * velocity.vy - radiusY * velocity.vx;

  const omegaRadians = tangentialVelocity / radiusSquared;

  const omegaDegrees = omegaRadians * (180 / Math.PI);

  return omegaDegrees;
}



export function normalizeDelta(delta: number) {
  'worklet';
  // keep delta in [-180, 180] so it doesn't jump across the wrap point
  if (delta > 180) {
    return delta - 360;
  }

  if (delta < -180) {
    return delta + 360;
  }

  return delta;
}