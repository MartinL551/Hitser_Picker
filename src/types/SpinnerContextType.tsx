
export type SpinnerContextType = {
  spinnerPosition: number;
  setSpinnerPosition: React.Dispatch<React.SetStateAction<number>>;
  spinnerSpun: boolean;
  setSpinnerSpun: React.Dispatch<React.SetStateAction<boolean>>;
};