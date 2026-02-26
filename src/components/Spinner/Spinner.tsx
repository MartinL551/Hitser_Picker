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
      })
      .onFinalize((e) => { 
        if(velocity.value < 300) {
          return;
        }
        
        const finalAngle = velocity.value % 360;
        const hasActivedeck = entries.filter((deck) => deck.active === true).length > 0; 
        angle.value = withTiming(velocity.value, { duration: velocity.value, easing: Easing.bezier(0.24, 0.76, 0.17, 0.78)}, (complete) => {
          if(complete && hasActivedeck){
            scheduleOnRN(updateSpinnerSpun, setSpinnerPosition, setSpinnerSpun, true, finalAngle);
          }
        });

      })

    const animatedStyle = useAnimatedStyle(() => ({transform: [{ rotate: angle.value.toString() + 'deg' }]}))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle]}>
         <Image source={require(`../../../assets/icons/record.png`)}  resizeMode={'cover'} style={{width: 300, height: 300}}/>
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

  const radiusSquared = radiusX^2 + radiusY^2;

  if(radiusSquared < MIN_RADIUS_SQUARED) {
    return 0;
  }

  const tangentialVelocity = radiusX * velocity.vy - radiusY * velocity.vx;

  const omegaRadians = tangentialVelocity / radiusSquared;

  const omegaDegrees = omegaRadians * (180 / Math.PI);

  return omegaDegrees;
}

