import React, { useState } from 'react';
import { Text, View,  StyleSheet, Image  } from 'react-native';
import { scheduleOnRN, getRuntimeKind } from 'react-native-worklets';
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

    const { spinnerSpun, spinnerPosition, setSpinnerPosition, setSpinnerSpun, hitserValues } = React.useContext(hitserContext); 
  
    const panGesture = Gesture.Pan()
      .onUpdate((e) => {
        velocity.value = e.velocityX;
        angle.value = e.translationX * (-1);
      })
      .onFinalize((e) => { 
        if(velocity.value < 300) {
          return;
        }
        
        let finalAngle = velocity.value % 360;
        let hasActiveHitser = hitserValues.filter((hister) => hister.active === true).length > 0; 
        angle.value = withTiming(velocity.value, { duration: velocity.value, easing: Easing.bezier(0.24, 0.76, 0.17, 0.78)}, (complete) => {
          if(complete && hasActiveHitser){
            scheduleOnRN(updateSpinnerSpun, setSpinnerPosition, setSpinnerSpun, true, finalAngle);
          }
        });

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

function updateSpinnerSpun(setSpinnerPosition, setSpinnerSpun, flag, finalAngle) {
  setSpinnerPosition(finalAngle);
  setSpinnerSpun(flag);
}

