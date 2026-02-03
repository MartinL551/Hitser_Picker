import * as React from "react";
import { HitserItemsType } from "@/types/HitserItemsType";

const initialHisterState = [
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Rock',
        type: 'Rock',
        message: 'Rock and roll',
        active: true,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Pop',
        type: 'Pop',
        message: 'Its Popping off',
        active: true,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Celebrations',
        type: 'celebrations',
        message: 'Celebrations are here',
        active: true,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Disco',
        type: 'disco',
        message: 'Disco Time',
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