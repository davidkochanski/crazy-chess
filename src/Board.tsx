import { useState } from "react";
import Tile from "./Tile";
import { MovementOptions, getMovementOptions, isWhite } from "./Moves";


const Board = () => {
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);

    const [castlingRights, setCastingRights] = useState<Array<boolean>>([true, true, true, true]);
    const [enPassantSquare, setEnPassantSquare] = useState<Array<number | null>>([null, null]);


    const [pieces, setPieces] = useState<Array<Array<String>>>(
        [
            ['R', 'P', '-', '-', '-', '-', 'p', 'r'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['C', 'P', '-', '-', '-', '-', 'p', 'c'],
            ['K', 'P', '-', '-', '-', '-', 'p', 'k'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['R', 'P', '-', '-', '-', '-', 'p', 'r']
        ]
    );

    const [highlighted, setHighlighted] = useState<Array<Array<boolean>>>(Array.from({ length: 8 }, () => Array(8).fill(false)))
    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)))


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
            const possibleMoves = [[x + 1, y + 2],[x + 2, y + 1],[x + 2, y - 1],[x + 1, y - 2],[x - 1, y - 2],[x - 2, y - 1],[x - 2, y + 1],[x - 1, y + 2],
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
            const possibleMoves = [[x + 1, y],[x - 1, y],[x, y + 1],[x, y - 1],[x + 1, y + 1],[x + 1, y - 1],[x - 1, y + 1],[x - 1, y - 1]];

            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];

                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })

            if(isWhite(movingPiece)) {
                if(castlingRights[0] && pieces[1][0] === '-' && pieces[2][0] === '-' && pieces[3][0] === '-') {
                    updateLegalMoves(2, 0);
                }

                if(castlingRights[1] && pieces[5][0] === '-' && pieces[6][0] === '-') {
                    updateLegalMoves(6, 0);
                }

            } else {
                if(castlingRights[2] && pieces[1][7] === '-' && pieces[2][7] === '-' && pieces[3][7] === '-') {
                    updateLegalMoves(2, 7);
                }

                if(castlingRights[3] && pieces[5][7] === '-' && pieces[6][7] === '-') {
                    updateLegalMoves(6, 7);
                }
            }
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

                if(y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x+1)) {
                    legalMoves.push([x+1, y+1])
                }

                if(y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x-1)) {
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

                
                if(y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x+1)) {
                    legalMoves.push([x+1, y-1])
                }

                if(y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x-1)) {
                    legalMoves.push([x-1, y-1])
                }
            }
        }

        if(movements.canMoveAsCamel) {
            const possibleMoves = [[x + 1, y + 3],[x + 3, y + 1],[x + 3, y - 1],[x + 1, y - 3],[x - 1, y - 3],[x - 3, y - 1],[x - 3, y + 1],[x - 1, y + 3]];

            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];

                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }

        return legalMoves;
    };

    const handleTileSelect = (nextX: number, nextY: number) => {
        // Highlighting a new piece
        if (selectedX === null || selectedY === null) {
            setSelectedX(nextX);
            setSelectedY(nextY);

            const movingPiece = pieces[nextX][nextY];
            const movements: MovementOptions = getMovementOptions(movingPiece.toLowerCase());
            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, movements);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(false));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = true;
            })
            setHighlighted(newHighlighted);
        

        // Deselecting
        } else if (selectedX === nextX && selectedY === nextY) {

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

            // Verify if move is legal
            const movingPiece = newPieces[selectedX][selectedY];
            const movements: MovementOptions = getMovementOptions(movingPiece.toLowerCase());
            const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, movements);
            
            for(let i = 0; i < legalMoves.length; i++) {
                if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([nextX, nextY]))) {
                    newPieces[nextX][nextY] = movingPiece;
                    newPieces[selectedX][selectedY] = '-';

                    let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))
        
                    newPreviousMove[selectedX][selectedY] = 2; // Destination
                    newPreviousMove[nextX][nextY] = 1 // origin

                    setPreviousMove(newPreviousMove);
                    break;
                    
                }
            }


            // Pawn promotion
            for(let i = 0; i < pieces.length; i++) {
                if(pieces[i][0] === 'p') {
                    pieces[i][0] = 'q';
                }
                if(pieces[i][7] === 'P') {
                    pieces[i][7] = 'Q';
                }
            }

            // Played en passant
            if(movingPiece === 'P' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
                pieces[nextX][nextY-1] = "-";
            }

            if(movingPiece === 'p' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
                pieces[nextX][nextY+1] = "-";
            }

            // En passant square
            setEnPassantSquare([null, null]);

            if(movingPiece === 'P' && selectedY === 1 && nextY === 3) {
                setEnPassantSquare([nextX, nextY-1]);
            }

            if(movingPiece === 'p' && selectedY === 6 && nextY === 4) {
                setEnPassantSquare([nextX, nextY+1]);
            }

            // Move rook if castling
            if(castlingRights[0] && movingPiece === 'K' && nextX === 2 && nextY === 0) {
                pieces[0][0] = '-';
                pieces[3][0] = 'R';
            }

            if(castlingRights[1] && movingPiece === 'K' && nextX === 6 && nextY === 0) {
                pieces[7][0] = '-';
                pieces[5][0] = 'R';
            }

            if(castlingRights[2] && movingPiece === 'k' && nextX === 2 && nextY === 7) {
                pieces[0][7] = '-';
                pieces[3][7] = 'r';
            }

            if(castlingRights[3] && movingPiece === 'k' && nextX === 6 && nextY === 7) {
                pieces[7][7] = '-';
                pieces[5][7] = 'r';
            }

            // Update castling rights
            const newRights = [...castlingRights];
            
            if(movingPiece === 'K') {
                newRights[0] = false;
                newRights[1] = false;
            }

            if(movingPiece === 'k') {
                newRights[2] = false;
                newRights[3] = false;
            }

            if(pieces[0][0] !== 'R') newRights[0] = false;
            if(pieces[7][0] !== 'R') newRights[1] = false;
            if(pieces[0][7] !== 'r') newRights[2] = false;
            if(pieces[7][7] !== 'r') newRights[3] = false;

            setCastingRights(newRights);

            setPieces(newPieces);
            
            setSelectedX(null);
            setSelectedY(null);
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
