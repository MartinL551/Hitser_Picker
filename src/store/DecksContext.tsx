import * as React from 'react';
import type { DeckItemsContextType, DeckItemsInterface } from '@/types/DeckItemsType';
import { loadDeckState, saveDeckState } from './PersistStore';

const initialEntiresState : DeckItemsInterface = [
    {
        icon: require(`../../assets/icons/record.png`),
        name: 'Original',
        type: 'ORG',
        message: 'The Og',
        active: true,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Guilty Pleasures',
        type: 'GPS',
        message: 'No Guilt Here',
        active: false,
    },
    {
        icon: require(`../../assets/icons/star.png`),
        name: 'Schlager Party',
        type: 'SCP',
        message: 'The Og',
        active: false,
    },
    {
        icon: require(`../../assets/icons/icelolly.png`),
        name: 'Summer Party',
        type: 'SMP',
        message: 'The Og',
        active: false,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Rock',
        type: 'RAR',
        message: 'Rock and roll',
        active: false,
    },
    {
        icon: require(`../../assets/icons/recordplat.png`),
        name: 'Platinum Edition',
        type: 'PED',
        message: 'Its Popping off',
        active: false,
    },
    {
        icon: require(`../../assets/icons/wineglass.png`),
        name: 'Celebrations',
        type: 'CES',
        message: 'Celebrations are here',
        active: false,
    },
    {
        icon: require(`../../assets/icons/headphones.png`),
        name: 'Bingo',
        type: 'BIN',
        message: 'Disco Time',
        active: false,
    },    
]


export const DecksContext = React.createContext<DeckItemsContextType | null>(null);

export function DecksProvider( {children}: {children: React.ReactNode}) {
    const [entries, setEntries] = React.useState<DeckItemsInterface>(initialEntiresState);

    React.useEffect(() => {
        (async () => {
            const saved = await loadDeckState();
            if (!saved) {
                return;
            }

            setEntries(prev =>
                prev.map(deck => {
                    const found = saved.find(savedDeck => savedDeck.type === deck.type);
                    return found ? { ...deck, active: found.active } : deck;
                })
            );
        })();
    }, []);

    React.useEffect(() => {
        saveDeckState(entries);
    }, [entries]);

    const value = React.useMemo(() => ({ entries, setEntries }), [entries]);

    return <DecksContext.Provider value={value}>{children}</DecksContext.Provider>;
}



