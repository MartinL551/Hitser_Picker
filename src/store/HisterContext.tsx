import * as React from "react";
import { HitserItemsType } from "@/types/HitserItemsType";




export const hitserContext = React.createContext();

export const HitserProvider = ({ children }) => {

    const [hitserValues, setHitserValues] = React.useState('test');

    return (
                // this is the provider providing state
        <hitserContext.Provider value={{hitserValues, setHitserValues}}>
            {children}
        </hitserContext.Provider>
    );
}; 