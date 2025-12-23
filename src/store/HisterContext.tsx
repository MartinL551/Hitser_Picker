import * as React from "react";
import { HitserItemsType } from "@/types/HitserItemsType";

const initialHisterState = [
    {
        icon: 'rock',
        name: 'Rock',
        type: 'Rock',
        show: true,
    },
    {
        icon: 'pop',
        name: 'Pop',
        type: 'Pop',
        show: true,
    }
]

const initialSpinnerPosition = 0;



export const hitserContext = React.createContext();

export const HitserProvider = ({ children }) => {

    const [hitserValues, setHitserValues] = React.useState(initialHisterState);
    const [spinnerPosition, spinnerPosition] = React.useState(initialSpinnerPosition);

    return (
                // this is the provider providing state
        <hitserContext.Provider value={{hitserValues, setHitserValues}}>
            {children}
        </hitserContext.Provider>
    );
}; 