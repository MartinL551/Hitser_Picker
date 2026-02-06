import React, { useState } from 'react';
import { Text, View,  StyleSheet, Image  } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import { hitserContext } from '@/store/HisterContext';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
  cancelAnimation,
  Easing,
  interpolate
} from 'react-native-reanimated';

export const Spinner = () => {

    const angle = useSharedValue(0);
    const velocity = useSharedValue(0);
    const [animationRunning, setAnimationRunning] = useState(false);

    const { spinnerSpun, spinnerPosition, setSpinnerPosition, setSpinnerSpun } = React.useContext(hitserContext); 
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        velocity.value = e.velocityX;
        angle.value = e.translationX;
      })
      .onFinalize((e) => { 
        angle.value = withTiming(velocity.value, { duration: velocity.value, easing: Easing.bezier(0.24, 0.76, 0.17, 0.78)});
        let finalAngle = velocity.value % 360;
        if(!animationRunning) {
          scheduleOnRN(setSpinnerPosition, finalAngle);
          scheduleOnRN(setAnimationRunning, true);
          scheduleOnRN(updateSpinnerSpunAfterDuration, setSpinnerSpun, true, velocity.value);
          scheduleOnRN(updateAnimationFlagAfterDuration, setAnimationRunning, false, velocity.value);
        } 
      })

    const animatedStyle = useAnimatedStyle(() => ({transform: [{ rotate: angle.value.toString() + 'deg' }]}))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle]}>
         <Image source={require(`../../../assets/icons/record.png`)}  resizeMode={'cover'} style={{width: 250, height: 250}}/>
      </ Animated.View>
    </GestureDetector> 
  );
};



function updateSpinnerSpunAfterDuration(setSpinnerSpun, flag, delay) {
      setTimeout(() => {
          setSpinnerSpun(flag);
          updateSpinnerSpunAfterDuration(setSpinnerSpun, false, 5000);
      }, delay + 100)
}

function updateAnimationFlagAfterDuration(setAnimationRunning, flag, delay) {
      setTimeout(() => {
          setAnimationRunning(flag);
      }, delay)
}