import AsyncStorage from "@react-native-async-storage/async-storage";
import type { DeckItemsInterface } from "@/types/DeckItemsType";

const DECK_KEY = "deck_state_v1"
const TUTORIAL_KEY = "tutorial_shown_v1"

export async function saveDeckState (entries: DeckItemsInterface){
    const payload = entries.map(deck => ({type: deck.type, active: deck.active}))
    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(payload));
}

export async function loadDeckState(): Promise<null | { type: string; active: boolean }[]> {
    const rawData = await AsyncStorage.getItem(DECK_KEY);

    if(!rawData) {
        return null;
    }

    try{
        return JSON.parse(rawData);
    } catch {
        return null;
    }
}

export async function saveShownTutorialState(flag: boolean) {
    await AsyncStorage.setItem(TUTORIAL_KEY, JSON.stringify(flag));
}

export async function  loadShownTutorialState():Promise<null | boolean> {
    const rawData = await AsyncStorage.getItem(DECK_KEY);

    if(!rawData) {
        return null;
    }

    try{
        return JSON.parse(rawData);
    } catch {
        return null;
    }
}