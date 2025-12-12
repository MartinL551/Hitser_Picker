import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues } = React.useContext(hitserContext);

  return (
    <View className={styles.getStartedContainer}>
      <View className={styles.helpContainer}>
        <Text>
            Context value: 
          { hitserValues.map((hitser, index) => <Button key={index} onPress={() => hideOnPress(hitser, index, hitserValues, setHitserValues)} title={hitser.name + hitser.show} />)}
        </Text>
      </View>

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

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12 pt-5`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};


