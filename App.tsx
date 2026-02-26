import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { HitserProvider } from '@/store/HisterContext';
import { DecksProvider } from '@/store/DecksContext';
import { SpinnerProvider } from '@/store/SpinnerContext';
import { SpinnerScreen } from '@/screens/spinner/SpinnerScreen';
import './global.css';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

export default function App() {
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




const styles = {
  appContainer: `bg-purple`,
};