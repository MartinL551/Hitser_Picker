import React, { useState } from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { hitserContext } from '@/store/HisterContext';


export const HitserPopup = ({hitser, index}) => {
  const { hitserValues, spinnerPosition, spinnerSpun, setSpinnerSpun } = React.useContext(hitserContext);
  let show = spinnerSpun && isSelectedHister(spinnerPosition, hitserValues, index, hitser);

  return (
    <Modal animationType="slide" transparent={true} visible={show}  onShow={(e) => {  updateSpinnerSpunAfterDuration(setSpinnerSpun, false, 5000) }}>
      <View className={styles.histerTypePopup}>
        <Image source={hitser.icon}  resizeMode={'contain'} style={{width: 150, height: 150}}/>
        <Text>
          { hitser.name }
        </Text>
        <Text>
          { hitser.message }
        </Text>
      </View>
    </Modal>
  );
};

function isSelectedHister(spinnerPosition, histerValues, index, hitser) {

    if(!hitser.active){
      return false;
    }

    let activeHisterValues = histerValues.filter((hister) => hister.active === true);
    let currentActiveIndex = activeHisterValues.findIndex(activeHitser => activeHitser.type === hitser.type);
    let {minAngle, maxAngle} = getSegmentsAngle(currentActiveIndex, activeHisterValues.length);

    console.log('name', hitser.name, 'index', currentActiveIndex, 'minAngle', minAngle, 'maxAngle', maxAngle);

    // if(spinnerPosition && activeHisterValues.length === 1 && hitser.active) {
    //   return true;
    // }

    if (spinnerPosition && isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
        console.log(spinnerPosition, 'hitAngle', hitser.name, 'hitName');
        return true;
    }

    return false;
}

function isAngleInRange(angle, max, min){
  angle %= 360

  console.log('minCheck', min, 'maxCheck', max);

  if(min <= max) {
    return min <= angle && max >= angle;
  } else {
    return angle >= min || angle <= max;
  }
}

function getSegmentsAngle(index, totalSegments) {
  let degreesPerSegment = 360/totalSegments;
  let minAngle = index * degreesPerSegment;
  let maxAngle = (index + 1) * degreesPerSegment;

  return {
    minAngle: minAngle,
    maxAngle: maxAngle,
  }
}

function updateSpinnerSpunAfterDuration(setSpinnerSpun, spunState, delay) {
      setTimeout(() => {
        setSpinnerSpun(spunState);
      }, delay)
}


const styles = {
  histerTypePopup: `flex-1 items-center justify-center bg-blue-500 border-4 border-purple-500`,
};
