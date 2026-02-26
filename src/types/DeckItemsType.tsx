import { DeckItemInterface } from "./DeckItemInterface";

export type DeckItemsInterface = DeckItemInterface[];

export type DeckItemsContextType = {
    entries: DeckItemsInterface,
    setEntries: React.Dispatch<React.SetStateAction<DeckItemsInterface>>;
}