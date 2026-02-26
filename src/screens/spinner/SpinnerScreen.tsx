import React from 'react';
import { View, Text} from 'react-native';
import { Spinner } from '@/components/Spinner/Spinner';
import { DeckType } from '@/components/DeckType/DeckType';
import { DeckPopup } from '@/components/DeckPopup/DeckPopup';
import { DeckItemInterface } from '@/types/DeckItemInterface';
import { useDecks } from '@/hooks/storeHooks';



export const SpinnerScreen = () => {
  const { entries } = useDecks();

  return (
    <View className={styles.screenContainer}>
      <View className={styles.spinnerContainer}>
          <Spinner/>
      </View>

      <View className={styles.decksTitleContainer}>
        <Text className={styles.decksTitle}> Pick the decks below </Text>
      </View>
      <View className={styles.decksContainer}>
        { 
          entries.map((deck: DeckItemInterface, index: number) => <DeckType key={index} index={index} deck={deck} />)
        }
      </View>
      <View>
        { 
          entries.map((deck: DeckItemInterface, index: number) => <DeckPopup key={index} index={index} deck={deck} />)
        }
      </View>
    </View>
  );
};

const styles = {
  screenContainer: `flex-1 items-center justify-center px-3 pt-5 bg-purple-500`,
  decksContainer: 'flex-row flex-wrap px-2 py-2 bg-deckgrey w-full',
  spinnerContainer: 'items-center justify-center py-[50px] border-4 border-deckgrey bg-deckwood w-full',
  decksTitleContainer: 'w-full flex items-center bg-deckgrey',
  decksTitle: 'text-center text-2xl bg-deckgold px-4 py-2 my-2 font-bold'
};


