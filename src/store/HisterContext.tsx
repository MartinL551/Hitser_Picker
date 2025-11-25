import * as React from "react";
import HitserItemsType from "../types/HitserItemsType";




export const hitserContext = React.createContext();

const HitserProvider = (props) => {

    const [hitserValues, setHitserValues] = React.useState();

    return (
                // this is the provider providing state
        <hitserContext.Provider value={[hitserValues, setHitserValues]}>
            {props.children}
        </hitserContext.Provider>
    );
}; 