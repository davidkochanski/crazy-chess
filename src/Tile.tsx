import "./Board.css"
import { decodePiece } from "./Moves"

type TileProps = {
    x: number;
    y: number;
    isSelected: boolean;
    isBeingDragged: boolean;
    isHighlighted: boolean;
    previousMove: number;
    id: number;
    onSelect: (x: number, y: number, movingPiece: String) => void;
    onSelectUp: (x: number, y: number, movingPiece: String) => void;
    piece: String;
    tile: String;
}

const Tile: React.FC<TileProps> = ({x, y, isSelected, isHighlighted, isBeingDragged, tile, previousMove, onSelect, onSelectUp, piece}) => {

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

    const handleUp = () => {
        onSelectUp(x, y, piece);
    }

    const putHighlightedMarker = () => {
        if(!isHighlighted) return;

        return piece === "-" ? <img className="tile-dot" src="img/dot.png"/>
                             : <img className="tile-cross" src="img/cross.png"/>
    }

    return (
        <div style={{backgroundImage: tile !== '-' ? `url(img/${tile}.png)` : ""}} onMouseDown={handleClick} onMouseUp={handleUp} className={`tile ${getColour()} ${isSelected ? "selected" : ""} ${previousMove === 2 ? "origin" : ""} ${previousMove === 1 ? "destination" : ""}`}>
            {!isBeingDragged ? <img draggable={false} className="piece-img" src={"img/" + decodePiece(piece) + ".png"} alt="" /> : <></>}
            {putHighlightedMarker()}
        </div>
    )
}

export default Tile;