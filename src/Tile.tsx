import "./Board.css"

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

const decodePiece = (s: String) => {
    if(s.length !== 1) return;

    switch(s) {
        case 'k':
            return 'black-king';
        case 'q':
            return 'black-queen';
        case 'r':
            return 'black-rook';
        case 'b':
            return 'black-bishop';
        case 'n':
            return 'black-knight';
        case 'p':
            return 'black-pawn';
        case 'K':
            return 'white-king';
        case 'Q':
            return 'white-queen';
        case 'R':
            return 'white-rook';
        case 'B':
            return 'white-bishop';
        case 'N':
            return 'white-knight';
        case 'P':
            return 'white-pawn';
        // case 'A':
        //     return 'white-amazon';
        case 'L':
            return 'white-lisek';
        case 'l':
            return 'black-lisek';
        case '-':
            return 'empty';
        default:
            return 'unknown';
    }
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
        console.log(id, x, y);
    }

    const putHighlighted = () => {
        if(!isHighlighted) return;

        if(piece === "-") {
            return <img className="tile-dot" src="img/dot.png"/>
        } else {
            return <img className="tile-cross" src="img/cross.png"/>
        }

    }

    return (
        <div onMouseDown={handleClick} className={`tile ${getColour()} ${isSelected ? "selected" : ""} ${previousMove === 2 ? "origin" : ""} ${previousMove === 1 ? "destination" : ""}`}>
            <img className="piece-img" src={"img/" + decodePiece(piece) + ".svg"} alt="" />
            {putHighlighted()}
        </div>
    )
}

export default Tile;