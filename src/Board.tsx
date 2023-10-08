import { useState } from "react";
import Tile from "./Tile";

type MovementOptions = {
    canMoveDiagonally: boolean;
    canMoveOrthagonally: boolean;
    canMoveAsKnight: boolean;
    canMoveAsKing: boolean;
    canMoveAsPawn: boolean;
}

const Board = () => {
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);

    const [pieces, setPieces] = useState<Array<Array<String>>>(
        [
            ['R', 'P', '-', '-', '-', '-', 'p', 'r'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['Q', 'P', '-', '-', '-', '-', 'p', 'q'],
            ['K', 'P', '-', '-', '-', '-', 'p', 'k'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['R', 'P', '-', '-', '-', '-', 'p', 'r']
        ]
    );

    const [highlighted, setHighlighted] = useState<Array<Array<boolean>>>(Array.from({ length: 8 }, () => Array(8).fill(false)))

    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)))


    const getMovementOptions = (piece: String) => {

        piece = piece.toLowerCase();

        let options: MovementOptions = { canMoveAsKnight: false, canMoveDiagonally: false, canMoveOrthagonally: false, canMoveAsKing: false, canMoveAsPawn: false };

        switch (piece) {
            case "b":
                options.canMoveDiagonally = true;
                break;
            case "q":
                options.canMoveDiagonally = true;
                options.canMoveOrthagonally = true;
                break;
            case "r":
                options.canMoveOrthagonally = true;
                break;
            case "n":
                options.canMoveAsKnight = true;
                break;
            case "k":
                options.canMoveAsKing = true;
                break;
            case "p":
                options.canMoveAsPawn = true;
                break;
            case "a":
                options.canMoveAsKnight = true;
                options.canMoveDiagonally = true;
                options.canMoveOrthagonally = true;
                break;
            case "l":
                options.canMoveAsKnight = true;
                options.canMoveDiagonally = true;
                options.canMoveOrthagonally = true;
                options.canMoveAsPawn = true;
        }

        return options;
    }

    const isWhite = (piece: String) => {
        return piece.toUpperCase() === piece;
    }

    const generateLegalMoves = (x: number, y: number, movements: MovementOptions) => {
        const MAX = 7;
        const MIN = 0;

        const movingPiece = pieces[x][y];

        const areDifferentColours = (piece1: String, piece2: String) => {
            if(piece1 === '-' || piece2 === '-') return false;
            return (isWhite(piece1) && !isWhite(piece2)) || (!isWhite(piece1) && isWhite(piece2));
        }

        const updateLegalMoves = (x: number, y: number) => {
            if(pieces[x][y] !== "-") {
                if(areDifferentColours(pieces[x][y], movingPiece)) {
                    legalMoves.push([x,y]);
                }
                return true;
            }
            legalMoves.push([x, y]);
            return false;
        }

        let legalMoves: Array<Array<number>> = [];

        if (movements.canMoveDiagonally) {
            for (let i = x + 1, j = y + 1; i <= MAX && j <= MAX; i++, j++) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x + 1, j = y - 1; i <= MAX && j >= MIN; i++, j--) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x - 1, j = y + 1; i >= MIN && j <= MAX; i--, j++) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x - 1, j = y - 1; i >= MIN && j >= MIN; i--, j--) {
                if(updateLegalMoves(i, j)) break;
            }
        }

        if(movements.canMoveOrthagonally) {
            for (let i = x + 1, j = y; i <= MAX && j <= MAX; i++) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x, j = y - 1; i <= MAX && j >= MIN; j--) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x, j = y + 1; i >= MIN && j <= MAX; j++) {
                if(updateLegalMoves(i, j)) break;
            }

            for (let i = x - 1, j = y; i >= MIN && j >= MIN; i--) {
                if(updateLegalMoves(i, j)) break;
            }
        }

        if(movements.canMoveAsKnight) {
            const possibleMoves = [
                [x + 1, y + 2],
                [x + 2, y + 1],
                [x + 2, y - 1],
                [x + 1, y - 2],
                [x - 1, y - 2],
                [x - 2, y - 1],
                [x - 2, y + 1],
                [x - 1, y + 2],
              ];

            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];

                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }

        if(movements.canMoveAsKing) {
            const possibleMoves = [
                [x + 1, y],
                [x - 1, y],
                [x, y + 1],
                [x, y - 1],
                [x + 1, y + 1],
                [x + 1, y - 1],
                [x - 1, y + 1],
                [x - 1, y - 1],
              ];

              possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];

                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }

        if(movements.canMoveAsPawn) {
            if(isWhite(movingPiece)) {

                if((y <= 1) && pieces[x][y+1] === '-' && pieces[x][y+2] === '-') {
                    legalMoves.push([x, y+2])
                }

                if(pieces[x][y+1] === '-') {
                    legalMoves.push([x, y+1])
                }
                
                if(x+1 <= MAX && areDifferentColours(pieces[x+1][y+1], pieces[x][y])) {
                    legalMoves.push([x+1, y+1])
                }

                if(x-1 >= MIN && areDifferentColours(pieces[x-1][y+1], pieces[x][y])) {
                    legalMoves.push([x-1, y+1])
                }

            } else {
                if((y >= 6) && pieces[x][y-1] === '-' && pieces[x][y-2] === '-') {
                    legalMoves.push([x, y-2])
                }

                if(pieces[x][y-1] === '-') {
                    legalMoves.push([x, y-1])
                }

                if(x+1 <= MAX && areDifferentColours(pieces[x+1][y-1], pieces[x][y])) {
                    legalMoves.push([x+1, y-1])
                }

                if(x-1 >= MIN && areDifferentColours(pieces[x-1][y-1], pieces[x][y])) {
                    legalMoves.push([x-1, y-1])
                }
            }
        }

        return legalMoves;
    };

    const handleTileSelect = (x: number, y: number) => {
        // Highlighting a new piece
        if (selectedX === null || selectedY === null) {
            setSelectedX(x);
            setSelectedY(y);

            const movingPiece = pieces[x][y];
            const movements: MovementOptions = getMovementOptions(movingPiece.toLowerCase());
            const legalMoves: number[][] = generateLegalMoves(x, y, movements);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(false));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = true;
            })
            setHighlighted(newHighlighted);
        

        // Deselecting
        } else if (selectedX === x && selectedY === y) {

            setSelectedX(null);
            setSelectedY(null);
            setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(false)));


        // Clicking other square after selected another one
        } else {
            const newPieces = [...pieces];

            if(newPieces[selectedX][selectedY] === '-') {
                setSelectedX(null);
                setSelectedY(null);
                return;
            }

            const movingPiece = newPieces[selectedX][selectedY];
            const movements: MovementOptions = getMovementOptions(movingPiece.toLowerCase());
            const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, movements);
            
            for(let i = 0; i < legalMoves.length; i++) {
                if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([x, y]))) {
                    newPieces[x][y] = movingPiece;
                    newPieces[selectedX][selectedY] = '-';

                    let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))
        
                    newPreviousMove[selectedX][selectedY] = 2; // Destination
                    newPreviousMove[x][y] = 1 // origin

                    console.log(newPreviousMove);
        
                    setPreviousMove(newPreviousMove);
                    break;
                    
                }
            }

            setSelectedX(null);
            setSelectedY(null);


            for(let i = 0; i < pieces.length; i++) {
                if(pieces[i][0] === 'p') {
                    pieces[i][0] = 'q';
                }
                if(pieces[i][7] === 'P') {
                    pieces[i][7] = 'Q';
                }
            }



            setPieces(newPieces);
            setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(false)));
        }
    }

    const tilesBlueprint = Array.from({ length: 64 }, (_, index) => ({
        id: index,
        key: index,
        x: (index % 8),
        y: 7 - Math.floor(index / 8),
        isSelected: selectedX === index % 8 && selectedY === 7 - Math.floor(index / 8)
        // piece: pieces[(index % 8)][7 - Math.floor(index / 8)]
    }));

    return (
        <div className="board">
            {tilesBlueprint.map(tile => (
                <Tile
                    key={tile.key}
                    id={tile.id}
                    x={tile.x}
                    y={tile.y}
                    isSelected={tile.isSelected}
                    onSelect={handleTileSelect}
                    isHighlighted={highlighted[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                    previousMove={previousMove[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                    piece={pieces[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                />
            ))}
        </div>
    )
};


export default Board;
