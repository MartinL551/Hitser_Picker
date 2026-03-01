import { DecksProvider } from '@/store/DecksContext';
import { SpinnerProvider } from '@/store/SpinnerContext';
import { SpinnerScreen } from '@/screens/spinner/SpinnerScreen';
import './global.css';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import 'src/modules/i18n'; // Import i18n configuration



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