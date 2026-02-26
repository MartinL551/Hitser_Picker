import { DeckItemInterface } from "./DeckItemInterface";

export type DeckItemsInterface = DeckItemInterface[];

export type DeckItemsContextType = {
    entries: DeckItemInterface,
    setEntries: React.Dispatch<React.SetStateAction<DeckItemInterface>>;
}