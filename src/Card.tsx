import React from "react";

type CardProps = {
    name: string;
    description: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, description, onClick}) => {
    const properName = name.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()).replace("-", " ")


    return (
        <button onClick={onClick} className="card">
            <div className="card-top"><h2>{properName}</h2></div>

            <img src={`img/${name}.png`} alt={name} />

            <div className="card-description">
                {description}
            </div>
        </button>
    )
}

export default Card;