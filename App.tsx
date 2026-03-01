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
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
   const [fontsLoaded] = useFonts({
    //register fonts for metro/expo
    BitcountPropDoubleInk: require("./assets/fonts/BitcountPropDouble_Regular.ttf"),
    BitcountPropDoubleInkBold: require("./assets/fonts/BitcountPropDouble_Bold.ttf")
  });

 
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // keep splash until font is ready
  }

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