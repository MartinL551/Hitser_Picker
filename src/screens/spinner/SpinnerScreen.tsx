import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';
import { HitserType } from '@/components/HitserType/HitserType';
import { HitserPopup } from '@/components/HitserPopup/HitserPopup';
import { HitserItemInterface } from '@/types/HitserItemInterface';
import { HitserItemsInterface } from '@/types/HitserItemsInterface';



export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues, spinnerPosition }= React.useContext(hitserContext);

  return (
    <View className={styles.screenContainer}>
      <View className={styles.spinnerContainer}>
          <Spinner/>
      </View>

      <View className={styles.histersContainer}>
        { 
          hitserValues.map((hitser: HitserItemInterface, index: number) => <HitserType key={index} index={index} hitser={hitser} />)
        }
      </View>
      <View className=''>
        { 
          hitserValues.map((hitser: HitserItemInterface, index: number) => <HitserPopup key={index} index={index} hitser={hitser} />)
        }
      </View>
    </View>
  );
};




const styles = {
  screenContainer: `flex-1 items-center justify-center px-8 pt-5 bg-purple-500`,
  histersContainer: 'flex-row flex-wrap px-2 py-2 bg-deckgrey w-full',
  spinnerContainer: 'flex1 items-center justify-center py-[50px] border-4 border-deckgrey bg-deckwood w-full',
};


