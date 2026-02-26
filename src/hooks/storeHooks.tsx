import * as React from "react";
import { DecksContext } from "../store/DecksContext";
import { SpinnerContext } from "../store/SpinnerContext";
import { SpinnerContextType } from '@/types/SpinnerContextType';
import { DeckItemsContextType } from '@/types/DeckItemsType';

export function useDecks(): DeckItemsContextType {
  const ctx = React.useContext(DecksContext);
  if (!ctx) throw new Error("useDecks must be used within <DecksProvider />");
  return ctx;
}

export function useSpinner(): SpinnerContextType {
  const ctx = React.useContext(SpinnerContext);
  if (!ctx) throw new Error("useSpinner must be used within <SpinnerProvider />");
  return ctx;
}