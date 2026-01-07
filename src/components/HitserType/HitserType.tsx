import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { HitserPopup } from '../HitserPopup/HitserPopup';


export const HitserType = ({hitser, index}) => {
  const { hitserValues, setHitserValues, spinnerPosition, spinnerSpun, setSpinnerSpun} = React.useContext(hitserContext);

  if(isSelectedHister(spinnerPosition, hitserValues, index, setSpinnerSpun) && spinnerSpun) {
    return (
        <HitserPopup title={hitser.name} message={hitser.message} /> 
    );
  }

  return (
    <View>
        <Text>Chossen by spinner: {}
            <Button onPress={() => hideOnPress(hitser, index, hitserValues, setHitserValues)} title={hitser.name + hitser.active} />
        </Text>    
    </View>
  );
};

function hideOnPress(hitser, hitserIndex, currentValues, setHitserValues) {
  let newHitser = {...hitser}
  newHitser.active = newHitser.active ? false : true;
  let newValues = [...currentValues]
  newValues[hitserIndex] = newHitser
  setHitserValues(newValues);
}

function isSelectedHister(spinnerPosition, histerValues, index, setSpinnerSpun) {
  let activeAngleDeg = 360/histerValues.length;
  let currentAngleDeg = activeAngleDeg * (index + 1);
  let minAngle = currentAngleDeg - (activeAngleDeg/2);
  let maxAngle = currentAngleDeg + (activeAngleDeg/2);

  console.log('index',index, 'minAngle', minAngle, 'maxAngle', maxAngle);

  if (isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
    setTimeout(() => {
        setSpinnerSpun(false);
    }, 5000)
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