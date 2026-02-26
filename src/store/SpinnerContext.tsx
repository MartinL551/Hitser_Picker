import * as React from 'react';
import { SpinnerContextType } from '@/types/SpinnerContextType';


export const SpinnerContext = React.createContext<SpinnerContextType | null>(null);

export function SpinnerProvider({ children }: { children: React.ReactNode }) {
  const [spinnerPosition, setSpinnerPosition] = React.useState(0);
  const [spinnerSpun, setSpinnerSpun] = React.useState(false);

  const value = React.useMemo(
    () => ({ spinnerPosition, setSpinnerPosition, spinnerSpun, setSpinnerSpun }),
    [spinnerPosition, spinnerSpun]
  );

  return <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>;
}