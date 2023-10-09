import "./Board.css"
import { decodePiece } from "./Moves"

type TileProps = {
    x: number;
    y: number;
    isSelected: boolean;
    isHighlighted: boolean;
    previousMove: number;
    id: number;
    onSelect: (x: number, y: number, movingPiece: String) => void;
    piece: String;
}

const Tile: React.FC<TileProps> = ({x, y, isSelected, isHighlighted, id, previousMove, onSelect, piece}) => {

    const getColour = () => {
        if((x + y + 1) % 2 === 0) {
            return "light";
        } else {
            return "dark";
        }
    }

    const handleClick = () => {
        onSelect(x, y, piece);
    }

    const putHighlightedMarker = () => {
        if(!isHighlighted) return;

        return piece === "-" ? <img className="tile-dot" src="img/dot.png"/>
                             : <img className="tile-cross" src="img/cross.png"/>
    }

    return (
        <div onMouseDown={handleClick} className={`tile ${getColour()} ${isSelected ? "selected" : ""} ${previousMove === 2 ? "origin" : ""} ${previousMove === 1 ? "destination" : ""}`}>
            <img className="piece-img" src={"img/" + decodePiece(piece) + ".png"} alt="" />
            {putHighlightedMarker()}
        </div>
    )
}

export default Tile;