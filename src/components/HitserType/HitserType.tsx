import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { HitserPopup } from '../HitserPopup/HitserPopup';


export const HitserType = ({hitser, index}) => {
  const { hitserValues, setHitserValues, spinnerPosition, spinnerSpun} = React.useContext(hitserContext);



  if(isSelectedHister(spinnerPosition, hitserValues, index,) && spinnerSpun) {
    return (
        <HitserPopup style={getCssPositionForHister(hitserValues, 300, index)} title={hitser.name} message={hitser.message} /> 
    );
  }

  return (
    <View style={getCssPositionForHister(hitserValues, 200, index)}>
        <Text>
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

function isSelectedHister(spinnerPosition, histerValues, index) {
    let activeHisterValues = histerValues.filter((hister) => hister.active === true);
    let activeAngleDeg = 360/activeHisterValues.length;
    let currentAngleDeg = activeAngleDeg * (index + 1);
    let minAngle = currentAngleDeg - (activeAngleDeg/2);
    let maxAngle = currentAngleDeg + (activeAngleDeg/2);

    console.log('index',index, 'minAngle', minAngle, 'maxAngle', maxAngle);

    if (isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
        return true;
    }

    return false;
}

function getAbsouluteAngleOfHister(histerValues, index) {
    let activeAngleDeg = 360/histerValues.length;
    let currentAngleDeg = activeAngleDeg * (index + 1);

    return currentAngleDeg;
}

function convertAngleToXY(histerValues, radius, index)
{
  let angle = getAbsouluteAngleOfHister(histerValues, index);
  let x = radius * Math.cos(Math.PI * 2 * angle / 360);
  let y = radius * Math.sin(Math.PI * 2 * angle / 360);

  return {x,y};
}

function getCssPositionForHister(histerValues, radius, index){
  let {x,y} = convertAngleToXY(histerValues, radius, index);

  x = Math.round(x);
  y = Math.round(y);

  return {
    top: `${y}px`,
    right: `${x}px`
  }
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


