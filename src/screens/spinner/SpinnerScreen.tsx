import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';
import { HitserType } from '@/components/HitserType/HitserType';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues, spinnerPosition } = React.useContext(hitserContext);

  return (
    <View className={styles.getStartedContainer}>
      <View className={styles.helpContainer}>
        <Text>
            Spinner Pos From Context: {spinnerPosition}
            Context value: 
          { 
            hitserValues.map((hitser, index) => <HitserType key={index} index={index} hitser={hitser} />)
          }
        </Text>
      </View>

      <Spinner/>

    </View>
  );
};




const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12 pt-5`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};


