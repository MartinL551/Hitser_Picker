import React from 'react';
import { Text, View, Button } from 'react-native';
import { hitserContext } from '@/store/HisterContext';


export const HitserPopup = ({hitser, index}) => {
  const { hitserValues, spinnerPosition, spinnerSpun } = React.useContext(hitserContext);

  if(spinnerSpun && isSelectedHister(spinnerPosition, hitserValues, index)) {
    return (
      <View>
        <Text>
          { hitser.name }
          { hitser.message }
        </Text>
      </View>
    );
  }

  return;
};

function isSelectedHister(spinnerPosition, histerValues, index) {
    let activeHisterValues = histerValues.filter((hister) => hister.active === true);
    let activeAngleDeg = 360/activeHisterValues.length;
    let currentAngleDeg = activeAngleDeg * (index);
    let minAngle = currentAngleDeg - (activeAngleDeg/2);
    let maxAngle = currentAngleDeg + (activeAngleDeg/2);

    console.log('index',index, 'minAngle', minAngle, 'maxAngle', maxAngle);

    if (isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
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