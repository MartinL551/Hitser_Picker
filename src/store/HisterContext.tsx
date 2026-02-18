import * as React from "react";
import { HitserItemsInterface } from "@/types/HitserItemsType";
import { HitserContextPropsInterface } from "@/types/HisterContexPropsInterface"

const initialHisterState : HitserItemsInterface = [
    {
        icon: require(`../../assets/icons/record.png`),
        name: 'Original',
        type: 'ORG',
        message: 'The Og',
        active: true,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Guilty Pleasures',
        type: 'GPS',
        message: 'No Guilt Here',
        active: false,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Schlager Party',
        type: 'SCP',
        message: 'The Og',
        active: false,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Summer Party',
        type: 'SMP',
        message: 'The Og',
        active: false,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Rock',
        type: 'RAR',
        message: 'Rock and roll',
        active: false,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Platinum Edition',
        type: 'PED',
        message: 'Its Popping off',
        active: false,
    },
    {
        icon: require(`../../assets/icons/microphone.png`),
        name: 'Celebrations',
        type: 'CES',
        message: 'Celebrations are here',
        active: false,
    },
    {
        icon: require(`../../assets/icons/guitar.png`),
        name: 'Bingo',
        type: 'BIN',
        message: 'Disco Time',
        active: false,
    },    
]

const initialSpinnerPosition : number = 0;

export const hitserContext = React.createContext();

export const HitserProvider = ({ children }: HitserContextPropsInterface) => {

    const [hitserValues, setHitserValues] = React.useState(initialHisterState);
    const [spinnerPosition, setSpinnerPosition] = React.useState(initialSpinnerPosition);
    const [spinnerSpun, setSpinnerSpun] = React.useState(false);

    return (
      
        <hitserContext.Provider value={{hitserValues, setHitserValues, spinnerPosition, setSpinnerPosition, spinnerSpun, setSpinnerSpun}}>
            {children}
        </hitserContext.Provider>
    );
}; 