import React from 'react';
import { Image  } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useDecks, useSpinner } from '@/hooks/storeHooks';

type Point = {
  x: number;
  y: number;
};

type Velocity = {
  vx: number;
  vy: number;
};

const MIN_RADIUS_SQUARED = 0.000001;

export const Spinner = () => {

    const angle = useSharedValue(0);
    const velocity = useSharedValue(0);
    const WHEEL_SIZE = 300;

    const { setSpinnerPosition, setSpinnerSpun,} = useSpinner();
    const { entries } = useDecks();
  
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        const currentVel = {
          vx: e.velocityX,
          vy: e.velocityY,
        }

        const currentPoint = {
          x: e.absoluteX, 
          y: e.absoluteY,
        }

        const centerPoint = {
          x: WHEEL_SIZE / 2,
          y: WHEEL_SIZE / 2,
        }

        console.log('tx', e.translationX, 'ty', e.translationY);

        const omegaDegrees = getAngularVelocityFromPan(currentPoint, currentVel, centerPoint);
        velocity.value = omegaDegrees;
      })
      .onFinalize((e) => {
        const MIN_SPIN_DEG = 420;
        const omega = velocity.value;
               
        if(Math.abs(omega) < 80) {
          return;
        }

        // work out distance to spin
        const spinDistance = omega * 15;
        const spinDistanceWithMin = Math.sign(spinDistance) * Math.max(Math.abs(spinDistance), MIN_SPIN_DEG);

        // get speed value from omgea velcocity and use this to compute the duration in ms
        const speed = Math.abs(omega);
        const durationMs = 600 + Math.min(2000, speed * 5); 

        // workout target angle from the start angle value. 
        const start = angle.value;
        const target = start + spinDistanceWithMin;


        const hasActivedeck = entries.filter((deck) => deck.active === true).length > 0; 
        angle.value = withTiming(target, { duration: durationMs, easing: Easing.bezier(0.21, 0.68, 0, 0.95)}, (complete) => {
          if(complete && hasActivedeck){
            const finalAngle = ((target % 360) + 360) % 360; 
            scheduleOnRN(updateSpinnerSpun, setSpinnerPosition, setSpinnerSpun, true, finalAngle);
          }
        });

      })

    const animatedStyle = useAnimatedStyle(() => ({transform: [{ rotate: angle.value.toString() + 'deg' }]}))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle]}>
         <Image source={require(`../../../assets/icons/record.png`)}  resizeMode={'cover'} style={{width: WHEEL_SIZE , height: WHEEL_SIZE }}/>
      </ Animated.View>
    </GestureDetector> 
  );
};

function updateSpinnerSpun(
  setSpinnerPosition: React.Dispatch<React.SetStateAction<number>>, 
  setSpinnerSpun: React.Dispatch<React.SetStateAction<boolean>>, 
  flag: boolean, 
  finalAngle: number
) {
  setSpinnerPosition(finalAngle);
  setSpinnerSpun(flag);
}

function getAngularVelocityFromPan(
  position: Point,
  velocity: Velocity,
  center: Point,
): number{
  const radiusX = position.x - center.x;
  const radiusY = position.y - center.y;

  const radiusSquared = radiusX * radiusX + radiusY * radiusY;

  if(radiusSquared < MIN_RADIUS_SQUARED) {
    return 0;
  }

  const tangentialVelocity = radiusX * velocity.vy - radiusY * velocity.vx;

  const omegaRadians = tangentialVelocity / radiusSquared;

  const omegaDegrees = omegaRadians * (180 / Math.PI);

  return omegaDegrees;
}

