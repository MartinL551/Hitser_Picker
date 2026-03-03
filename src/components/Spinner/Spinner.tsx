import React from 'react';
import { Image, View, ImageBackground } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useDecks, useSpinner } from '@/hooks/storeHooks';
import { getAngularVelocityFromPan, normalizeDelta } from '@/utlis/spinnerMath';
import {
  MIN_SPIN_DEG,
  BASE_SPIN_DURATION,
  MAX_SPIN_DURATION,
  MIN_SPIN_THRESHOLD,
} from '@/constants/spinner';

export const Spinner = () => {
  const angle = useSharedValue(0);
  const startAngle = useSharedValue(0);
  const startRotation = useSharedValue(0);
  const velocity = useSharedValue(0);
  const WHEEL_SIZE = 300;
  const CX = WHEEL_SIZE / 2;
  const CY = WHEEL_SIZE / 2;

  const { setSpinnerPosition, setSpinnerSpun } = useSpinner();
  const { entries } = useDecks();

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      const touchDeg = Math.atan2(e.absoluteY - CY, e.absoluteX - CX) * (180 / Math.PI);
      startAngle.value = touchDeg;
      startRotation.value = angle.value;
    })
    .onUpdate((e) => {
      const currentVel = {
        vx: e.velocityX,
        vy: e.velocityY,
      };

      const currentPoint = {
        x: e.absoluteX,
        y: e.absoluteY,
      };

      const centerPoint = {
        x: CX,
        y: CY,
      };

      //Get angle in deg from center of circle
      const touchDeg = Math.atan2(e.absoluteY - CY, e.absoluteX - CX) * (180 / Math.PI);

      let delta = touchDeg - startAngle.value;
      delta = normalizeDelta(delta);

      angle.value = startRotation.value + delta * 2;

      const omegaDegrees = getAngularVelocityFromPan(currentPoint, currentVel, centerPoint);
      velocity.value = omegaDegrees;
    })
    .onFinalize((e) => {
      const omega = velocity.value;

      if (Math.abs(omega) < MIN_SPIN_THRESHOLD) {
        return;
      }

      // work out distance to spin
      const spinDistance = omega * 15;
      const spinDistanceWithMin =
        Math.sign(spinDistance) * Math.max(Math.abs(spinDistance), MIN_SPIN_DEG);

      // get speed value from omgea velcocity and use this to compute the duration in ms
      const speed = Math.abs(omega);
      const durationMs = BASE_SPIN_DURATION + Math.min(MAX_SPIN_DURATION, speed * 5);

      // workout target angle from the start angle value.
      const start = angle.value;
      const target = start + spinDistanceWithMin;

      const hasActivedeck = entries.filter((deck) => deck.active === true).length > 0;
      angle.value = withTiming(
        target,
        { duration: durationMs, easing: Easing.bezier(0.21, 0.68, 0, 0.95) },
        (complete) => {
          'worklet';

          if (complete && hasActivedeck) {
            const finalAngle = ((target % 360) + 360) % 360;
            scheduleOnRN(() => {
              updateSpinnerSpun(setSpinnerPosition, setSpinnerSpun, true, finalAngle);
            });
          }
        }
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: angle.value.toString() + 'deg' }],
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignSelf: 'center',
  }));

  return (
    <ImageBackground
      source={require(`../../../assets/textures/woodTexture.png`)}
      resizeMode={'repeat'}
      style={{ width: '100%' }}>
      <View className={styles.recordPlayerContainer}>
        <View className={styles.stylusContainer}>
          <Image
            source={require(`../../../assets/icons/playerstylusV6.png`)}
            resizeMode={'contain'}
            style={{ width: '100%', height: 60 }}
          />
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[animatedStyle]}>
            <Image
              source={require(`../../../assets/icons/recordV2.png`)}
              resizeMode={'cover'}
              style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
            />
          </Animated.View>
        </GestureDetector>
        <View className={styles.knobContainer}>
          <Image
            source={require(`../../../assets/icons/controlknobV2.png`)}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </View>
    </ImageBackground>
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

const styles = {
  stylusContainer: 'mr-1',
  recordPlayerContainer: 'flex p-5',
  knobContainer: 'w-[40px] self-center mr-[200px]',
};
