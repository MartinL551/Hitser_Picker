import type { DeckItemInterface } from "./DeckItemInterface";
import type React from "react";

export type DeckItemsInterface = DeckItemInterface[];

export type DeckItemsContextType = {
    entries: DeckItemsInterface,
    setEntries: React.Dispatch<React.SetStateAction<DeckItemsInterface>>;
}