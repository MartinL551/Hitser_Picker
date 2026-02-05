import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';
import { HitserType } from '@/components/HitserType/HitserType';
import { HitserPopup } from '@/components/HitserPopup/HitserPopup';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues, spinnerPosition } = React.useContext(hitserContext);

  return (
    <View className={styles.screenContainer}>
      <View className={styles.spinnerContainer}>
          <Spinner/>
      </View>

      <View className={styles.histersContainer}>
        { 
          hitserValues.map((hitser, index) => <HitserType key={index} index={index} hitser={hitser} />)
        }
      </View>
      <View className=''>
        { 
          hitserValues.map((hitser, index) => <HitserPopup key={index} index={index} hitser={hitser} />)
        }
      </View>
    </View>
  );
};




const styles = {
  screenContainer: `flex-1 items-center justify-center px-12 pt-5 bg-purple-500`,
  histersContainer: 'flex-row flex-wrap px-2 py-2 bg-deckgrey basis-1/4 w-full',
  spinnerContainer: 'flex1 items-center justify-center py-[100px] border-4 border-deckgrey bg-deckwood w-full',
};


