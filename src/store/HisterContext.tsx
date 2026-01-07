import * as React from "react";
import { HitserItemsType } from "@/types/HitserItemsType";

const initialHisterState = [
    {
        icon: 'rock',
        name: 'Rock',
        type: 'Rock',
        message: 'Rock and roll',
        active: true,
    },
    {
        icon: 'pop',
        name: 'Pop',
        type: 'Pop',
        message: 'Its Popping off',
        active: true,
    },
    {
        icon: 'celebrations',
        name: 'Celebrations',
        type: 'celebrations',
        message: 'Celebrations are here',
        active: true,
    }
]

const initialSpinnerPosition = 0;



export const hitserContext = React.createContext();

export const HitserProvider = ({ children }) => {

    const [hitserValues, setHitserValues] = React.useState(initialHisterState);
    const [spinnerPosition, setSpinnerPosition] = React.useState(initialSpinnerPosition);
    const [spinnerSpun, setSpinnerSpun] = React.useState(false);

    return (
      
        <hitserContext.Provider value={{hitserValues, setHitserValues, spinnerPosition, setSpinnerPosition, spinnerSpun, setSpinnerSpun}}>
            {children}
        </hitserContext.Provider>
    );
}; 