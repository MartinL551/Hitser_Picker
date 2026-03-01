import React, { useEffect } from "react";
import { DecksProvider } from '@/store/DecksContext';
import { SpinnerProvider } from '@/store/SpinnerContext';
import { SpinnerScreen } from '@/screens/spinner/SpinnerScreen';
import './global.css';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import 'src/modules/i18n'; // Import i18n configuration
import { useFonts } from "expo-font";


export default function App() {
   useFonts({
    //register fonts for metro/expo
    BitcountPropDoubleInk: require("./assets/fonts/BitcountPropDouble_Regular.ttf"),
  });

  return (
      <GestureHandlerRootView>
        <SpinnerProvider >
          <DecksProvider>
              <SpinnerScreen />
          </DecksProvider>
        </SpinnerProvider>
      </GestureHandlerRootView>
  );
}