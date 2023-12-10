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
            ['KNOOK', 'PAWN', '-', '-', '-', '-', 'pawn', 'rook'],
            ['KNIGHT', 'PAWN', '-', '-', '-', '-', 'pawn', 'knight'],
            ['BISHOP', 'PAWN', '-', '-', '-', 'FOX', 'pawn', 'bishop'],
            ['QUEEN', 'PAWN', '-', '-', '-', '-', 'pawn', 'queen'],
            ['KING', 'PAWN', 'FOX', '-', '-', '-', 'pawn', 'king'],
            ['BISHOP', 'PAWN', '-', '-', '-', '-', 'pawn', 'archbishop'],
            ['KNIGHT', 'PAWN', '-', '-', '-', '-', 'pawn', 'knight'],
            ['KNOOK', 'PAWN', '-', '-', '-', '-', 'pawn', 'rook']
        ]
    );

    // [
    //     ['ROOK', 'PAWN', '-', '-', '-', '-', 'pawn', 'rook'],
    //     ['KNIGHT', 'PAWN', '-', '-', '-', '-', 'pawn', 'knight'],
    //     ['BISHOP', 'PAWN', '-', '-', '-', '-', 'pawn', 'bishop'],
    //     ['QUEEN', 'PAWN', '-', '-', '-', '-', 'pawn', 'queen'],
    //     ['KING', 'PAWN', '-', '-', '-', '-', 'pawn', 'king'],
    //     ['BISHOP', 'PAWN', '-', '-', '-', '-', 'pawn', 'bishop'],
    //     ['KNIGHT', 'PAWN', '-', '-', '-', '-', 'pawn', 'knight'],
    //     ['ROOK', 'PAWN', '-', '-', '-', '-', 'pawn', 'rook']
    // ]

    const [tiles, setTiles] = useState<Array<Array<String>>>(Array.from({ length: 8 }, () => Array(8).fill('-')));

    // test
    // useEffect(() => {
    //     setTiles(    [
    //         ['-', '-', '-', 'wall', '-', '-', '-', '-'],
    //         ['-', '-', '-', '-', 'wall', '-', '-', '-'],
    //         ['-', '-', '-', 'wall', '-', '-', '-', '-'],
    //         ['-', '-', '-', '-', 'wall', '-', '-', '-'],
    //         ['-', '-', '-', 'wall', '-', '-', '-', '-'],
    //         ['-', '-', '-', '-', 'wall', '-', '-', '-'],
    //         ['-', '-', '-', 'wall', '-', '-', '-', '-'],
    //         ['-', '-', '-', '-', 'wall', '-', '-', '-']
    //     ])
    
    // }, []) 


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

    const getAllSeenSquares = (byWhite: boolean) => {

        let allMoves: number[][] = [];

        pieces.forEach((row, i) => {
            row.forEach((piece, j) => {
                if(isWhite(piece) && !byWhite || !isWhite(piece) && byWhite) return;

                let moves = generateLegalMoves(i, j, pieces, tiles, castlingRights, enPassantSquare);

                for(const tuple of moves) {
                    if(!allMoves.includes(tuple)) {
                        allMoves.push(tuple);
                    }
                }
            })
        })

        return allMoves;
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

        const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, pieces, tiles, castlingRights, enPassantSquare);
        let movePlayed = false;
        
        for(let i = 0; i < legalMoves.length; i++) {
            if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([nextX, nextY]))) {
                newPieces[nextX][nextY] = movingPiece;
                newPieces[selectedX][selectedY] = '-';

                let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))
    
                newPreviousMove[selectedX][selectedY] = 2; // Destination
                newPreviousMove[nextX][nextY] = 1 // origin
                
                getAllSeenSquares(whiteToPlay).forEach((coords) => {
                    let x = coords[0];
                    let y = coords[1];

                    if(!whiteToPlay && newPieces[x][y] === "KING" || whiteToPlay && newPieces[x][y] === "king") {
                        newPreviousMove[x][y] = 3; // check
                    }
                })

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

        let bufferPieces = [...newPieces.map(row => [...row])];

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                bufferPieces = getBehaviour(pieces[x][y]).onMoveEnd(x, y, bufferPieces);
            }
        }

        setPieces(bufferPieces);
        
        if (movePlayed) setWhiteToPlay(!whiteToPlay);
        
        setSelectedX(null);
        setSelectedY(null);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(false)));


        let whiteKingIsAlive = boardHasAtLeastOne('KING');
        let blackKingIsAlive = boardHasAtLeastOne('king');

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
        // Highlighting a new piece
        if (selectedX === null || selectedY === null) {
            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, pieces, tiles, castlingRights, enPassantSquare);

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

    const updateDraggingPiece = () => {
        const draggingPiece = document.getElementById("dragging-piece") as HTMLImageElement;
        const sampleTile = document.getElementsByClassName("tile")[0] as HTMLDivElement;

        draggingPiece.style.width = `${sampleTile.clientWidth}px`;
        draggingPiece.style.height = `${sampleTile.clientHeight}px`;
        draggingPiece.style.display = isDragging ? "block" : "none";
    }

    const putPieceOnCursor = (e: MouseEvent) => {
        const draggingPiece = document.getElementById("dragging-piece") as HTMLImageElement;
        const sampleTile = document.getElementsByClassName("tile")[0] as HTMLDivElement;

        const board = document.getElementById("board");
        const rect = board?.getBoundingClientRect();

        if(rect === undefined) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const relativeX = mouseX - rect.left - (sampleTile.clientWidth / 2)
        const relativeY = mouseY - rect.top - (sampleTile.clientWidth / 2)

        draggingPiece.style.transform = `translate(${relativeX}px, ${relativeY}px)`
    }


    const handlePieceDown = (e: MouseEvent) => {
        setDragging(true);

        updateDraggingPiece();
        putPieceOnCursor(e);
        
    }

    const handlePieceDragging = (e: MouseEvent) => {
        if (selectedX === null || selectedY === null || !isDragging) return;

        putPieceOnCursor(e);
      }
      
    useEffect(() => {
        updateDraggingPiece();
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
        <div id="board" style={isDragging ? {cursor: "grabbing"} : {}} onMouseDown={handlePieceDown} onMouseMove={(e) => handlePieceDragging(e)} onMouseUp={() => setDragging(false)} className="board">
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
                    tile={tiles[(tile.id % 8)][7 - Math.floor(tile.id / 8)]}
                />
            ))}
        <img id="dragging-piece" src={selectedX !== null && selectedY !== null ? `img/${decodePiece(pieces[selectedX][selectedY])}.png` : "img/empty.png"} alt="" />

        </div>

    )
};


export default Board;
