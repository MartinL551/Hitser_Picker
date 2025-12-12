import { ScreenContent } from '@/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { HitserProvider } from '@/store/HisterContext';
import { SpinnerScreen } from '@/screens/spinner/SpinnerScreen';
import './global.css';
import { verifyInstallation } from 'nativewind';


export default function App() {
      verifyInstallation();
  return (
    <HitserProvider>
      <SpinnerScreen />
    </HitserProvider>
  );
}
