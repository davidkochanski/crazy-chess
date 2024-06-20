import { Piece } from "./Pieces/Piece";
import React from "react";

type SwitchProps = {
    tempSelected: Piece | null;
    setTempSelected: (value: React.SetStateAction<Piece | null>) => void
    attr: keyof Piece; // this is key (literally)
}


const PropertySwitch: React.FC<SwitchProps> = ({tempSelected, setTempSelected, attr}) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={tempSelected ? !!tempSelected[attr] : false} onChange={() => {
                setTempSelected((temp) => {
                    if (!temp) return temp;
                    return { ...temp, [attr]: !temp[attr] };
                });
            }}/>
            <span className="slider" style={{backgroundColor: tempSelected && !!tempSelected[attr] ? "green" : "gray"}}></span>
            <div className="switch-text">{attr}</div>
        </label>
    )
}

export default PropertySwitch;