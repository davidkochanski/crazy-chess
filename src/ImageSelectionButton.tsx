import { Piece } from "./Pieces/Piece";
import React from "react";

type SwitchProps = {
    tempSelected: Piece | null;
    setTempSelected: (value: React.SetStateAction<Piece | null>) => void;
    image: string;
}


const ImageSelectionButton: React.FC<SwitchProps> = ({tempSelected, setTempSelected, image}) => {
    return (
        <button onClick={() => {setTempSelected(prev => {return prev ? {...prev, image: image} : prev})} } className="modal-img" style={{outline: tempSelected?.image === image ? "12px solid white" : "3px solid white"}}>
            <div className="modal-img-background"  style={{ backgroundColor: tempSelected?.colour || "white", filter: "brightness(0.75)"}} ></div>
            <img src={`img/white-${image}`} alt="" />
        </button>
    )
}

export default ImageSelectionButton;