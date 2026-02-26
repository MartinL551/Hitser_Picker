import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDecks } from '@/store/storeHooks';
import type { DeckItemInterface } from '@/types/DeckItemInterface';
import type { DeckItemsInterface } from '@/types/DeckItemsType';

type Props = {
  deck: DeckItemInterface,
  index: number
}

export const deckType = ({deck, index} :Props) => {
  const { entries, setEntries } = useDecks();

  return (
    <View className={styles.histerTypeContainer}>
       <Text className={styles.histerTitle}>{deck.name}</Text>
        <TouchableOpacity className={deck.active ? styles.histerTypeActive : styles.histerTypeInactive } onPress={() => activeOnPress(deck, index, entries, setEntries)}  style={{width: 50, height: 50}}> 
            <Image source={deck.icon}  resizeMode={'contain'} style={{width: 40, height: 40}}/>
        </TouchableOpacity>   
    </View>
  );
};

function activeOnPress(
  deck: DeckItemInterface, 
  deckIndex: number, 
  currentValues: DeckItemsInterface, 
  setdeckValues: React.Dispatch<React.SetStateAction<DeckItemsInterface>>) {
  let newdeck = {...deck}
  newdeck.active = newdeck.active ? false : true;
  let newValues = [...currentValues]
  newValues[deckIndex] = newdeck
  setdeckValues(newValues);
}

const styles = {
  histerTypeActive: `flex flex-row items-center justify-center  py-2 px-3 mx-2 my-3 border-2 border-green-500 rounded-[10] bg-lime-500`,
  histerTypeInactive: `flex flex-row items-center justify-center px-3 mx-2 my-3 border-2 border-red-500 rounded-[10] bg-orange-500`,
  histerTypeContainer: 'flex items-center justify-center basis-1/4 p-1',
  histerTitle: 'text-center text-xs bg-slate-500 font-semibold w-full'
};



