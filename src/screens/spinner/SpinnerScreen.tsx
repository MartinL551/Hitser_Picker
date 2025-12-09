import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View, Button } from 'react-native';

export const SpinnerScreen = () => {
  const { hitserValues, setHitserValues } = React.useContext(hitserContext);

  return (
    <View>
      <Text>
        Context value: 
        { hitserValues.map((hitser, index) => <Button key={index} onPress={() => hideOnPress(index, hitserValues, setHitserValues)} title={hitser.name + hitser.show} />)}
      </Text>
    </View>
  );
};


function hideOnPress(index, currentValues, setHitserValues) {
    const initialHisterState = [
      {
          icon: 'rock',
          name: 'Rock',
          type: 'Rock',
          show: true,
      },
      {
          icon: 'pop',
          name: 'Pop',
          type: 'Pop',
          show: false,
      }
  ]

  console.log('updating state');

  setHitserValues(initialHisterState)

}

