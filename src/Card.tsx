import React from "react";
import Color from "color";

type CardProps = {
    name: string;
    description: string;
    colour: string;
    image: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selected: boolean
};

const Card: React.FC<CardProps> = ({ name, description, colour, image, onClick, selected }) => {
    const properName = name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()).replace("-", " ");
    const bgColor = Color(colour);
    const textColor = bgColor.isLight() ? 'black' : 'white';

    return (
        <button className="card" style={{ backgroundColor: colour, scale: selected ? "1.025" : "1", outline: selected ? "white 5px solid" : "none"}} onClick={onClick}>
            <div className="card-top" style={{ backgroundColor: colour, filter: "brightness(0.75)" }}></div>
            <div className="card-top-text" style={{ color: textColor }}>
                <h2>{properName}</h2>
            </div>
            <img src={`img/${image}.png`} alt={name} />
            <div className="card-description" style={{ color: textColor }}>
                {description}
            </div>
        </button>
    );
};

export default Card;
