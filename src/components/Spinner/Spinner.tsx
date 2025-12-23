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


    const angle = useSharedValue(0);
    const velocity = useSharedValue(0);
    const [velocityToRender, setVelocity] = React.useState(0);
    const MAX_VELOCITY = 1000;
    const { spinnerPosition, setSpinnerPosition } = React.useContext(hitserContext);


    const panGesture = Gesture.Pan()
        .onUpdate((e) => {


        })
        .onEnd((e) => {

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