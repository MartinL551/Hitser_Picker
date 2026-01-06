import * as React from "react";
import { HitserItemsType } from "@/types/HitserItemsType";

const initialHisterState = [
    {
        icon: 'rock',
        name: 'Rock',
        type: 'Rock',
        active: true,
    },
    {
        icon: 'pop',
        name: 'Pop',
        type: 'Pop',
        active: true,
    },
    {
        icon: 'celebrations',
        name: 'Celebrations',
        type: 'celebrations',
        active: true,
    }
]

const initialSpinnerPosition = 0;



export const hitserContext = React.createContext();

export const HitserProvider = ({ children }) => {

    const [hitserValues, setHitserValues] = React.useState(initialHisterState);
    const [spinnerPosition, setSpinnerPosition] = React.useState(initialSpinnerPosition);

    return (
      
        <hitserContext.Provider value={{hitserValues, setHitserValues, spinnerPosition, setSpinnerPosition}}>
            {children}
        </hitserContext.Provider>
    );
}; 