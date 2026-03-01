import React from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { useSpinner, useDecks } from '@/hooks/storeHooks';
import type { DeckItemInterface } from '@/types/DeckItemInterface';
import type { DeckItemsInterface } from '@/types/DeckItemsType';
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

type SegmentAngles = {
  minAngle: number;
  maxAngle: number;
};

type Props = {
  deck: DeckItemInterface,
  index: number
}

export const DeckPopup = ({deck} :Props) => {
  const { entries } = useDecks();
  const { spinnerPosition, spinnerSpun, setSpinnerSpun} = useSpinner();
  const { t } = useTranslation();
  const typeKey = deck.type;

  let show = spinnerSpun && isSelecteddeck(spinnerPosition, entries, deck);
  const duration = 1000;
  const easing = Easing.bezier(0.66, -1, 0.27, 1.98);
  const svIcon = useSharedValue<number>(0.05);
  const svTitle = useSharedValue<number>(-0.03);

  React.useEffect(() => {
    svIcon.value = withRepeat(withTiming(-0.05, { duration, easing },), -1, true);
    svTitle.value = withRepeat(withTiming(0.03, { duration, easing },), -1, true);
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${svIcon.value * 360}deg` }],
  }));

  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${svTitle.value * 360}deg` }],
  }));

  return (
    <Modal animationType="slide" transparent={true} visible={show} onShow={(e) => {  updateSpinnerSpunAfterDuration(setSpinnerSpun, false, 5000) }}>
      <View className={styles.modalContainer} >
        <View className={styles.deckTypePopup}>
          <View className={styles.popupIconContainer}>
            <Animated.View style={[animatedIconStyle]}>
              <Image source={deck.icon} resizeMode={'contain'} style={{width: 150, height: 150}}/>
            </Animated.View>
          </View>
          <Animated.View style={[animatedTitleStyle]}>
            <Text className={styles.popupTitle}>
              { t(typeKey, { ns: 'histerTitles' }) }
            </Text>
          </Animated.View>
          <Text className={styles.popupBlurb}>
            { t(typeKey, { ns: 'histerBlurbs' }) }
          </Text>
        </View>
      </View>
    </Modal>
  );
};

function isSelecteddeck(
  spinnerPosition: number, 
  deckValues: DeckItemsInterface, 
  deck:  DeckItemInterface
): boolean {
    if(!deck.active){
      return false;
    }

    const activeDeckValues = deckValues.filter((deck) => deck.active === true);
    const currentActiveIndex = activeDeckValues.findIndex(
      activedeck => activedeck.type === deck.type
    );

    if(activeDeckValues.length === 0) {
      return false;
    }

    const {minAngle, maxAngle} = getSegmentsAngle(currentActiveIndex, activeDeckValues.length);

    if (spinnerPosition !== null && isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
        return true;
    }

    return false;
}

function isAngleInRange(
  angle: number, 
  max: number, 
  min: number
): boolean{
  angle %= 360

  if(min <= max) {
    return min <= angle && max >= angle;
  } else {
    return angle >= min || angle <= max;
  }
}

function getSegmentsAngle(
  index: number, 
  totalSegments: number
): SegmentAngles {
  const degreesPerSegment = 360/totalSegments;
  const minAngle = index * degreesPerSegment;
  const maxAngle = (index + 1) * degreesPerSegment;

  return {
    minAngle: minAngle,
    maxAngle: maxAngle,
  }
}

function updateSpinnerSpunAfterDuration(
  setSpinnerSpun: React.Dispatch<React.SetStateAction<boolean>>, 
  spunState: boolean, 
  delay: number): void {
    setTimeout(() => {
      setSpinnerSpun(spunState);
    }, delay)
}


const styles = {
  deckTypePopup: `items-center justify-center bg-blue-400 border-4 border-blue-500 m-auto p-4 rounded-[10] w-3/4 m-auto bg-opacity-50`,
  modalContainer: 'flex1 h-full',
  popupTitle: 'text-center text-3xl w-full my-5 rounded-[10] px-3 py-1 bg-onairred text-white font-bitcount-bold',
  popupBlurb: 'text-center text-medium my-5 py-2 px-5 w-full bg-white mt-[50px] font-bitcount-bold',
  popupIconContainer: 'my-4 bg-amber-300 p-2 rounded-[100]'
};
