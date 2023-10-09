import { useState, MouseEvent, useRef, useEffect } from "react";
import Tile from "./Tile";
import { isWhite, generateLegalMoves, handleCastlingPromotionEnPassant, decodePiece } from "./Moves";
import { getBehaviour } from "./PiecesBehaviours";


const Board = () => {
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);

    const [castlingRights, setCastingRights] = useState<Array<boolean>>([true, true, true, true]);
    const [enPassantSquare, setEnPassantSquare] = useState<Array<number | null>>([null, null]);

    const [whiteToPlay, setWhiteToPlay] = useState(true);

    const [isDragging, setDragging] = useState(false);

    const [pieces, setPieces] = useState<Array<Array<String>>>(
        [
            ['R', 'P', '-', '-', '-', '-', 'p', 'r'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['Q', 'P', '-', '-', '-', '-', 'p', 'q'],
            ['K', 'P', '-', 'f', '-', '-', 'p', 'k'],
            ['B', 'P', '-', '-', '-', '-', 'p', 'b'],
            ['N', 'P', '-', '-', '-', '-', 'p', 'n'],
            ['R', 'P', '-', '-', '-', '-', 'p', 'r']
        ]
    );

    const [squares, setSquares] = useState<Array<Array<String>>>(Array.from({ length: 8 }, () => Array(8).fill('-')));

    const [highlighted, setHighlighted] = useState<Array<Array<boolean>>>(Array.from({ length: 8 }, () => Array(8).fill(false)))
    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)))

    const boardHasAtLeastOne = (piece: String) => {
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(piece === pieces[x][y]) return true;
            }
        }

        return false;
    }

    // const getAllSquaresWith = (piece: String) => {
    //     let out = [];
    //     for(let x = 0; x < 8; x++) {
    //         for(let y = 0; y < 8; y++) {
    //             if(piece === pieces[x][y]) out.push([x,y])
    //         }
    //     }
    //     return out;
    // }


    const deselectAll = () => {
        setSelectedX(null);
        setSelectedY(null);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(false)));
    }

    const validateAndUpdateGame = (nextX: number, nextY: number) => {
        if(selectedX === null || selectedY === null) return;

        let newPieces = [...pieces];

        // Verify if move is legal
        const movingPiece = newPieces[selectedX][selectedY];

        if((whiteToPlay && !isWhite(movingPiece)) || !whiteToPlay && isWhite(movingPiece)) {
            deselectAll();
            return;
        }

        const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, pieces, castlingRights, enPassantSquare);
        let movePlayed = false;
        
        for(let i = 0; i < legalMoves.length; i++) {
            if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([nextX, nextY]))) {
                newPieces[nextX][nextY] = movingPiece;
                newPieces[selectedX][selectedY] = '-';

                let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))
    
                newPreviousMove[selectedX][selectedY] = 2; // Destination
                newPreviousMove[nextX][nextY] = 1 // origin

                setPreviousMove(newPreviousMove);
                
                movePlayed = true;
                break;
            }
        }

        if(!movePlayed) {
            deselectAll();
            return;
        }

        const updatedGameState = handleCastlingPromotionEnPassant(nextX, nextY, selectedX, selectedY, pieces, castlingRights, enPassantSquare);

        newPieces = updatedGameState.pieces;
        setCastingRights(updatedGameState.castlingRights);
        setEnPassantSquare(updatedGameState.enPassantSquare);
        
        // Call action function on each piece.
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                newPieces = getBehaviour(pieces[x][y]).action(x, y, newPieces);
            }
        }

        // Update state
        if(movePlayed) setWhiteToPlay(!whiteToPlay);
        setPieces(newPieces);
        
        setSelectedX(null);
        setSelectedY(null);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(false)));


        let whiteKingIsAlive = boardHasAtLeastOne('K');
        let blackKingIsAlive = boardHasAtLeastOne('k');

        if(!whiteKingIsAlive && !blackKingIsAlive) {
            setTimeout(() => {alert("DRAW")}, 50)
            return;
        }

        if(!whiteKingIsAlive) {
            setTimeout(() => {alert("Black wins!")}, 50)
            return
        }

        if(!blackKingIsAlive) {
            setTimeout(() => {alert("White wins!")}, 50)
        }
    }

    // For drag-and-drop
    const handleTileSelectUp = (nextX: number, nextY: number) => {
        setDragging(false);
        if(nextX === selectedX && nextY === selectedY) {
            setSelectedX(nextX);
            setSelectedY(nextY);
        } else if(selectedX !== null && selectedY !== null) {
            validateAndUpdateGame(nextX, nextY);
        }
    }

    const handleTileSelect = (nextX: number, nextY: number) => {
        setDragging(true);
        // Highlighting a new piece
        if (selectedX === null || selectedY === null) {

            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, pieces, castlingRights, enPassantSquare);

            setSelectedX(nextX);
            setSelectedY(nextY);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(false));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = true;
            })
            setHighlighted(newHighlighted);
        
        // Deselecting
        } else if (selectedX === nextX && selectedY === nextY) {
            deselectAll();
           
        // Clicking other square after selected another one
        } else {
            validateAndUpdateGame(nextX, nextY);
        }
    }

    const handlePieceDragging = (e: MouseEvent) => {
        if (selectedX === null || selectedY === null || !isDragging) return;
      
        const draggingImg = document.getElementById("dragging-piece") as HTMLImageElement;
        const board = document.getElementById("board");
      
        draggingImg.src = "img/" + decodePiece(pieces[selectedX][selectedY]) + ".png";
      
        // Calculate the offset to position the image at the cursor
        const rect = board?.getBoundingClientRect();

        if(rect === undefined) return;

        // Get the absolute mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the relative position
        const relativeX = mouseX - rect.left - (draggingImg.width / 2);
        const relativeY = mouseY - rect.top - (draggingImg.height / 2);
      
        // Use transform to apply translation relative to the cursor
        draggingImg.style.transform = `translate(${relativeX}px, ${relativeY}px)`;

        console.log(`translate(${relativeX}px, ${relativeY}px)`);
      }
      
    useEffect(() => {
        const draggingImg = document.getElementById("dragging-piece") as HTMLImageElement;
        const sampleTile = document.getElementsByClassName("tile")[0];

        draggingImg.style.width = `${sampleTile.clientWidth}px`;

        if(isDragging) {
            draggingImg.style.display = "block";
        } else {
            draggingImg.src = "img/empty.png";
            draggingImg.style.display = "none";
        }

    }, [isDragging])

    const tilesBlueprint = Array.from({ length: 64 }, (_, index) => ({
        id: index,
        key: index,
        x: (index % 8),
        y: 7 - Math.floor(index / 8),
        isSelected: selectedX === index % 8 && selectedY === 7 - Math.floor(index / 8)
        // piece: pieces[(index % 8)][7 - Math.floor(index / 8)]
    }));

    return (
        <div id="board" onMouseMove={(e) => handlePieceDragging(e)} onMouseUp={() => setDragging(false)} className="board">
            {tilesBlueprint.map(tile => (
                <Tile
                    key={tile.key}
                    id={tile.id}
                    x={tile.x}
                    y={tile.y}
                    isSelected={tile.isSelected}
                    isBeingDragged={isDragging && tile.isSelected}
                    onSelect={handleTileSelect}
                    onSelectUp={handleTileSelectUp}
                    isHighlighted={highlighted[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                    previousMove={previousMove[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                    piece={pieces[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                />
            ))}
        <img id="dragging-piece" src="" alt="" />

        </div>

    )
};


export default Board;
