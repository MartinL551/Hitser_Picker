import React, { useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export function TutorialOverlay({ visible, onDismiss }: Props) {
  const x = useSharedValue(0);

  useEffect(() => {
    if (!visible) return;

    x.value = 0;
    x.value = withRepeat(
      withTiming(120, { duration: 900, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [visible]);

  const fingerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  if (!visible) return null;

  return (
    <Pressable
      onPress={onDismiss}
      className={styles.overlay}
    >
      <View className={styles.contentContainer}>
        <Text className={styles.tutorialText}>
          Drag the record to spin
        </Text>

        <View className={styles.iconContainer}>
          <Animated.View style={[{ position: "absolute", right: 45, }, fingerStyle]}>
            <Image
              source={require("../../../assets/icons/hand.png")}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        <Text className={styles.tutorialText}>
          Tap to continue
        </Text>
      </View>
    </Pressable>
  );
}



const styles = {
  overlay: 'absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 items-center justify-center',
  contentContainer: 'items-center h-full justify-center gap-12',
  tutorialText: 'text-white font-bitcount-bold',
  iconContainer: 'w-300 h-300 items-center justify-center',
  iconAnimatedContainer: 'absolute left-90 top-150'
};
