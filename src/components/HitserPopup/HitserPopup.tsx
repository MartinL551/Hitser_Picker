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
    let activeHisterValues = histerValues.filter((hister) => hister.active === true);
    let activeAngleDeg = 360/activeHisterValues.length;
    let currentAngleDeg = activeAngleDeg * (index);
    let minAngle = currentAngleDeg - (activeAngleDeg/2);
    let maxAngle = currentAngleDeg + (activeAngleDeg/2);
      console.log('name', hitser.name, 'index',index, 'minAngle', minAngle, 'maxAngle', maxAngle);

    if (spinnerPosition && isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
        console.log(spinnerPosition, 'hitAngle', hitser.name, 'hitName');
        return true;
    }

    return false;
}

function isAngleInRange(angle, max, min){
  angle %= 360
  max %= 360
  min %= 360

  if(min <= max) {
    return min <= angle && max >= angle;
  } else {
    return angle >= min || angle <= max;
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
