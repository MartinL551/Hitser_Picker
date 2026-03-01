import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDecks } from '@/hooks/storeHooks';
import type { DeckItemInterface } from '@/types/DeckItemInterface';
import type { DeckItemsInterface } from '@/types/DeckItemsType';
import { useTranslation } from 'react-i18next';

type Props = {
  deck: DeckItemInterface,
  index: number
}

export const DeckType = ({deck, index} :Props) => {
  const { entries, setEntries } = useDecks();
  const { t } = useTranslation();
  const typeKey = deck.type;

  return (
    <View className={styles.deckTypeContainer}>
        <View className={styles.deckTitleContainer}>
            <Text className={styles.deckTitle}>{t(typeKey, { ns: 'histerTitles' })}</Text>
        </View>
        <TouchableOpacity className={deck.active ? styles.deckTypeActive : styles.deckTypeInactive } onPress={() => activeOnPress(deck, index, entries, setEntries)}  style={{width: 50, height: 50}}> 
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
  deckTypeActive: `flex flex-row items-center justify-center py-2 px-3 mx-2 my-3 border-2 border-green-500 rounded-[10] bg-lime-500`,
  deckTypeInactive: `flex flex-row items-center justify-center px-3 mx-2 my-3 border-2 border-red-500 rounded-[10] bg-orange-500`,
  deckTypeContainer: 'flex items-center justify-end basis-1/4 p-1',
  deckTitleContainer: 'flex items-center justify-center w-full h-[40px] bg-label',
  deckTitle: 'text-center text-xs font-bitcount-bold'
};



