import type { ImageSourcePropType } from "react-native";

export interface DeckItemInterface {
    icon: ImageSourcePropType,
    name: string,
    type: string,
    message: string,
    active: boolean,
}