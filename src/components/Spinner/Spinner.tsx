import React from 'react';
import { Text, View,  StyleSheet  } from 'react-native';

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
    const { spinnerPosition, setSpinnerPosition, setSpinnerSpun } = React.useContext(hitserContext); 


    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        velocity.value = e.velocityX;
        angle.value = e.translationX;
      })
      .onEnd((e) => { 
        angle.value = withTiming(velocity.value, { duration: velocity.value, easing: Easing.bezier(0.24, 0.76, 0.17, 0.78)});
        let finalAngle = velocity.value % 360;
        setSpinnerPosition(finalAngle);

        setTimeout(() => {
          setSpinnerSpun(true);
        }, velocity.value)
      })

    const animatedStyle = useAnimatedStyle(() => ({transform: [{ rotate: angle.value.toString() + 'deg' }]}))

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]}>
      </ Animated.View>
    </GestureDetector> 
  );
};

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 30,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});