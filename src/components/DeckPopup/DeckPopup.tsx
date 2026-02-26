import React from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { useSpinner, useDecks } from '@/hooks/storeHooks';
import type { DeckItemInterface } from '@/types/DeckItemInterface';
import type { DeckItemsInterface } from '@/types/DeckItemsType';

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

  let show = spinnerSpun && isSelecteddeck(spinnerPosition, entries, deck);

  return (
    <Modal animationType="slide" transparent={true} visible={show} onShow={(e) => {  updateSpinnerSpunAfterDuration(setSpinnerSpun, false, 5000) }}>
      <View className={styles.modalContainer} >
        <View className={styles.deckTypePopup}>
          <View className={styles.popupIconContainer}>
            <Image source={deck.icon} resizeMode={'contain'} style={{width: 150, height: 150}}/>
          </View>
          <Text className={styles.popupTitle}>
            { deck.name }
          </Text>
          <Text className={styles.popupBlurb}>
            { deck.message }
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
  deckTypePopup: `items-center justify-center bg-blue-500 border-4 border-purple-500 m-auto p-4 rounded-[10] w-3/4 m-auto `,
  modalContainer: 'flex1 h-full',
  popupTitle: 'text-center text-3xl bg-slate-500 font-bold w-full font-bold my-3 rounded-[10] rotate-[10deg] px-3 py-1',
  popupBlurb: 'text-center text-2xl text-bold my-3 text-m',
  popupIconContainer: 'my-4 bg-amber-300 p-2 rounded-[100]'
};
