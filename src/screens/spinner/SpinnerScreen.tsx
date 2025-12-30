import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues, spinnerPosition } = React.useContext(hitserContext);

  return (
    <View className={styles.getStartedContainer}>
      <View className={styles.helpContainer}>
        <Text>
            Spinner Pos From Context: {spinnerPosition}
            Context value: 
          { 
            hitserValues.map((hitser, index) => 
              <Text key={index}>Chossen by spinner: {isSelectedHister(spinnerPosition, hitserValues, index)}<Button key={index} onPress={() => hideOnPress(hitser, index, hitserValues, setHitserValues)} title={hitser.name + hitser.show} /></Text>    
            )
          }
        </Text>
      </View>

        <Spinner/>

    </View>
  );
};


function hideOnPress(hitser, hitserIndex, currentValues, setHitserValues) {
  let newHitser = {...hitser}
  newHitser.show = false
  let newValues = [...currentValues]
  newValues[hitserIndex] = newHitser
  setHitserValues(newValues);
}

function isSelectedHister(spinnerPosition, histerValues, index) {
  let activeAngleDeg = 360/histerValues.length;
  let currentAngleDeg = activeAngleDeg * (index + 1);
  let minAngle = currentAngleDeg - (activeAngleDeg/2);
  let maxAngle = currentAngleDeg + (activeAngleDeg/2);

  console.log(index, minAngle, maxAngle);

  if (isAngleInRange(spinnerPosition, maxAngle, minAngle)) {
    return 'true';
  }

  return 'false';
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
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12 pt-5`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};


