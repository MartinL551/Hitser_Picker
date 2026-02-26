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

export const Spinner = () => {

    const angle = useSharedValue(0);
    const velocity = useSharedValue(0);

    const { setSpinnerPosition, setSpinnerSpun,} = useSpinner();
    const { entries } = useDecks();
  
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
        let hasActivedeck = entries.filter((deck) => deck.active === true).length > 0; 
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
         <Image source={require(`../../../assets/icons/record.png`)}  resizeMode={'cover'} style={{width: 250, height: 250}}/>
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

