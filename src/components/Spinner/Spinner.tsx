import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
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
import { scheduleOnRN } from 'react-native-worklets'
import { forEach } from 'eslint.config';

export const Spinner = () => {


    const angle = useSharedValue(0);
    const velocity = useSharedValue(0);
    const [velocityToRender, setVelocity] = React.useState(0);
    const [currentAngle, setAngle] = React.useState(0);
    const MAX_VELOCITY = 30;
    const { spinnerPosition, setSpinnerPosition } = React.useContext(hitserContext);


    const panGesture = Gesture.Pan()
        .onStart((e) => {
           angle.value = 0;
        }) 
        .onUpdate((e) => {
            setVelocity(e.velocityX)

            if(MAX_VELOCITY > e.velocityX){
                velocity.value = MAX_VELOCITY;
            } else {
                velocity.value = Math.floor(e.velocityX);
            }
        })
        .onEnd((e) => { 
            let newAngle = angle.value + velocity.value;

            angle.value = newAngle;
        });
    
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: interpolate(angle.value, [0, 10000], [0, 360]) + 'deg' }],
        }
    })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} >
        <Text>{velocityToRender}</Text>
      </Animated.View>
    </GestureDetector>
    
  );
};




const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
});