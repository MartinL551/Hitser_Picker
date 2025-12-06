import { hitserContext } from '@/store/HisterContext';
import React from 'react';
import { Text, View } from 'react-native';

export const SpinnerScreen = () => {
  const { hitserValues } = React.useContext(hitserContext);

  return (
    <View>
      <Text>Context value: { hitserValues } </Text>
    </View>
  );
};

