import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { HitserPopup } from '../HitserPopup/HitserPopup';


export const HitserType = ({hitser, index}) => {
  const { hitserValues, setHitserValues, spinnerPosition, spinnerSpun} = React.useContext(hitserContext);



  if(isSelectedHister(spinnerPosition, hitserValues, index,) && spinnerSpun) {
    return (
        <HitserPopup title={hitser.name} message={hitser.message} /> 
    );
  }

  return (
    <View className={styles.histerType}>
        <TouchableOpacity onPress={() => hideOnPress(hitser, index, hitserValues, setHitserValues)}> 
            <Image source={require('./icons/guitar.png')}  resizeMode={'cover'} style={{width: 25, height: 50}}/>
        </TouchableOpacity>   
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
    let currentAngleDeg = activeAngleDeg * (index);
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
  let x = radius * Math.cos(angle * (Math.PI/180));
  let y = radius * Math.sin(angle * (Math.PI/180));

  console.log('index', index, 'render angle', angle, 'convert x', x, 'convert y', y);

  return {x,y};
}

function getCssPositionForHister(histerValues, radius, index){
  let {x,y} = convertAngleToXY(histerValues, radius, index);

  x = Math.round(x);
  y = Math.round(y);

  return {
    position: 'absolute',
    bottom: `${y}px`,
    left: `${x}px`,
    transform:'translate(-50%,-50%)'
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


const styles = {
  histerType: `py-2 px-3`,
};



