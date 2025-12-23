import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets'

export const Spinner = () => {

    const onLeft = useSharedValue(true);
    const position = useSharedValue(0);
    const velocity = useSharedValue(0);
    const [velocityToRender, setVelocity] = React.useState(0);
    const END_POSITION = 200;


    const panGesture = Gesture.Pan()
        .onUpdate((e) => {

            velocity.value = e.velocityX;
            if (onLeft.value) {
                position.value = e.translationX;
            } else {
                position.value = END_POSITION + e.translationX;
            }
        })
        .onEnd((e) => {
            if (position.value > END_POSITION / 2) {
                position.value = withTiming(END_POSITION, { duration: 100 });
                onLeft.value = false;
            } else {
                position.value = withTiming(0, { duration: 100 });
                onLeft.value = true;
             }

            velocity.value = e.velocityX;
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: velocity.value.toString() + 'deg' }],
    }))

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