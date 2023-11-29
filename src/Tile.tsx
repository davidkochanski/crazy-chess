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

        if(tile !== '-') return <img className="tile-ring" src="img/ring.png"/>

        return piece === "-" ? <img className="tile-dot" src="img/dot.png"/>
                             : <img className="tile-cross" src="img/cross.png"/>
    }

    const putTileEffect = () => {
        if(tile !== '-') {
            return <img draggable={false} className="tile-img" src={`img/${tile}.png`} alt="" />
        }
    }

    const styleTile = () => {
        switch(previousMove) {
            case 1:
                return "destination"
            case 2:
                return "origin"
            case 3:
                return "check"
            default:
                return ""
        }
    }

    return (
        <div onMouseDown={handleClick} onMouseUp={handleUp} className={`tile ${getColour()} ${isSelected ? "selected" : ""} ${styleTile()} ${previousMove === 1 ? "destination" : ""}`}>
            
            {!isBeingDragged ? <img draggable={false} className="piece-img" src={"img/" + decodePiece(piece) + ".png"} alt="" /> : <></>}
            {putHighlightedMarker()}
            {putTileEffect()}
        </div>
    )
}

export default Tile;