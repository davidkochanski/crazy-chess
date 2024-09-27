import { Piece } from "../GameData/Pieces/Piece";
import React from "react";

type SwitchProps = {
    tempSelected: Piece | null;
    setTempSelected: (value: React.SetStateAction<Piece | null>) => void
    attr: keyof Piece; // this is key (literally)
    label: string;
}


const PropertySwitch: React.FC<SwitchProps> = ({tempSelected, setTempSelected, attr, label}) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={tempSelected ? Boolean(tempSelected[attr]) : false} onChange={() => {
                setTempSelected((temp) => {
                    if (!temp) return temp;
                    return { ...temp, [attr]: !temp[attr] };
                });
            }}/>
            <span className="slider" style={{backgroundColor: tempSelected && !!tempSelected[attr] ? "#007500" : "#FF4040"}}></span>
            <div className="slider-circle">{tempSelected && Boolean(tempSelected[attr]) ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>}</div>

            <div className="switch-text">{label}</div>
        </label>
    )
}

export default PropertySwitch;