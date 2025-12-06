import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { HitserProvider } from '@/store/HisterContext';
import { SpinnerScreen } from '@/screens/spinner/SpinnerScreen';
import './global.css';

export default function App() {
  return (
    <HitserProvider>
      <SpinnerScreen />
    </HitserProvider>
  );
}
