import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';
import { HitserType } from '@/components/HitserType/HitserType';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues, spinnerPosition } = React.useContext(hitserContext);

  return (
    <View className={styles.spinnerContainer}>
      <Spinner/>
      <View className={styles.histersContainer}>
        <Text>
          { 
            hitserValues.map((hitser, index) => <HitserType key={index} index={index} hitser={hitser} />)
          }
        </Text>
      </View>

    </View>
  );
};




const styles = {
  spinnerContainer: `flex-1 items-center justify-center mx-12 pt-5 h-full`,
  histersContainer: 'flex items-center',
};


