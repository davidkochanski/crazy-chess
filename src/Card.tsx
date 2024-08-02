import React from "react";
import Color from "color";
import { Piece } from "./Pieces/Piece";

type CardProps = {
    piece: Piece;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selected: boolean;
    settingWhite: boolean;
    handleShowThisModal: () => void;
    deleteCard: () => void;
};

const Card: React.FC<CardProps> = ({ piece, onClick, selected, settingWhite, handleShowThisModal, deleteCard}) => {
    const properName = piece.name;
    const bgColor = Color(piece.colour);
    const textColor = bgColor.isLight() ? 'black' : 'white';

    return (
        <div className="card-wrapper" style={{ scale: selected ? "1.025" : "1", outline: selected ? "white 5px solid" : "none", zIndex: selected ? 100 : 1}}>
            <button className="card" style={{ backgroundColor: piece.colour}} onClick={onClick}>
                <div className="card-top" style={{ backgroundColor: piece.colour, filter: "brightness(0.75)" }}></div>
                <div className="card-top-text" style={{ color: textColor }}>
                    <h2>{properName}</h2>
                </div>
                <img src={`img/${settingWhite ? `white-${piece.image}` : `black-${piece.image}`}`} alt={piece.name} />
                <div className="card-description" style={{ color: textColor }}>
                    {piece.description}
                </div>
            </button>

            <button className="edit-card" type="button" onClick={() => {handleShowThisModal()}}><i className="fa-solid fa-pencil"></i></button>
            <button className="delete-card" type="button" onClick={() => {deleteCard()}}><i className="fa-solid fa-trash"></i></button>

        </div>
    );
};

export default Card;
