import * as React from 'react';
import { DecksContext } from '../store/DecksContext';
import { DeckItemsContextType } from '@/types/DeckItemsType';

export function useDecks(): DeckItemsContextType {
  const ctx = React.useContext(DecksContext);
  if (!ctx) throw new Error('useDecks must be used within <DecksProvider />');
  return ctx;
}
