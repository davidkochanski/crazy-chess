import "./Board.css"
import { decodeEffects } from "./Moves"
import { Piece } from "./Pieces/Piece";
import { Tile } from "./Tiles/Tile";

type TileProps = {
    x: number;
    y: number;
    isSelected: boolean;
    isBeingDragged: boolean;
    isHighlighted: number;
    previousMove: number;
    id: number;
    onSelect: (x: number, y: number, movingPiece: Piece) => void;
    onSelectUp: (x: number, y: number, movingPiece: Piece) => void;
    onRightClick: (x: number, y: number) => void;
    piece: Piece;
    tile: Tile;
}

const TileSquare: React.FC<TileProps> = ({x, y, isSelected, isHighlighted, isBeingDragged, tile, previousMove, onSelect, onSelectUp, onRightClick, piece}) => {

    const getColour = () => {
        if((x + y + 1) % 2 === 0) {
            return "light";
        } else {
            return "dark";
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if(e.button === 0) {
            onSelect(x, y, piece);
        } else if (e.button === 2) {
            onRightClick(x, y);
        }

    }

    const handleUp = () => {
        onSelectUp(x, y, piece);
    }


    const putHighlightedMarker = () => {
        if(!isHighlighted) return;

        if(!tile.isEmpty()) return <img className="tile-ring" src="img/ring.png"/>

        if(isHighlighted === 2) { // moving to threatened square
            return piece.isEmpty() ? <img className="tile-dot-red" src="img/dot-red.png"/>
            : <img className="tile-cross-red" src="img/cross-red.png"/>;
        } 

        return piece.isEmpty() ? <img className="tile-dot" src="img/dot.png"/>
        : <img className="tile-cross" src="img/cross.png"/>;


    }

    const putTileEffect = () => {
        if(tile.isEmpty()) {
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
            case -1:
                return "select"
            default:
                return ""
        }
    }

    const putEffects = () => {
        const effects = decodeEffects(piece);

        return effects.map((effect, i) => (
            <img key={i} src={`img/${effect}.png`} alt={effect} />
        ))
    }

    return (
        <div onMouseDown={(e) => {handleClick(e)}} onMouseUp={handleUp} id={`tile-${x}-${y}`} className={`tile ${getColour()} ${isSelected ? "selected" : ""} ${styleTile()} ${previousMove === 1 ? "destination" : ""}`}>
            
            {!isBeingDragged ? <img draggable={false} className="piece-img" src={"img/" + piece.toString() + ".png"} alt="" /> : <></>}
            {putHighlightedMarker()}
            {putTileEffect()}
            <div className="tile-effects">
                {putEffects()}
            </div>
        </div>
    )
}


export default TileSquare;