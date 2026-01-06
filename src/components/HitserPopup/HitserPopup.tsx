import React from 'react';
import { Text, View, Button } from 'react-native';


export const HitserPopup = ({title, message}) => {
  return (
    <View>
      <Text>
        { title }
        { message }
      </Text>
    </View>
  );
};
