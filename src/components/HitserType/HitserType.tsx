import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';


export const HitserType = ({hitser, index}) => {
  const { hitserValues, setHitserValues} = React.useContext(hitserContext);

  return (
    <View className={styles.histerTypeContainer}>
       <Text className={styles.histerTitle}>{hitser.name}</Text>
        <TouchableOpacity className={hitser.active ? styles.histerTypeActive : styles.histerTypeInactive } onPress={() => activeOnPress(hitser, index, hitserValues, setHitserValues)}  style={{width: 50, height: 50}}> 
            <Image source={hitser.icon}  resizeMode={'contain'} style={{width: 40, height: 40}}/>
        </TouchableOpacity>   
    </View>
  );
};

function activeOnPress(hitser, hitserIndex, currentValues, setHitserValues) {
  let newHitser = {...hitser}
  newHitser.active = newHitser.active ? false : true;
  let newValues = [...currentValues]
  newValues[hitserIndex] = newHitser
  setHitserValues(newValues);
}

const styles = {
  histerTypeActive: `flex flex-row items-center justify-center  py-2 px-3 mx-2 my-3 border-2 border-green-500 rounded-[10] bg-lime-500`,
  histerTypeInactive: `flex flex-row items-center justify-center px-3 mx-2 my-3 border-2 border-red-500 rounded-[10] bg-orange-500`,
  histerTypeContainer: 'flex items-center justify-center basis-1/4 p-1',
  histerTitle: 'text-center text-xs bg-slate-500 font-semibold w-full'
};



