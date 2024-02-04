import { useState, MouseEvent, useEffect } from "react";
import { Tile } from "./Tiles/Tile";
import { generateLegalMoves, handleCastlingPromotionEnPassant, decodePiece, generateLegalPlays } from "./Moves";
import { getBehaviour } from "./PiecesBehaviours";
import { getCardAction } from "./CardBehaviours";
import { getTileBehaviour } from "./TileBehaviours";
import Card from "./Card";
import { Piece } from "./Pieces/Piece";
import { Rook } from "./Pieces/Rook";
import { Knight } from "./Pieces/Knight";
import { Bishop } from "./Pieces/Bishop";
import { Queen } from "./Pieces/Queen";
import { King } from "./Pieces/King";
import { Pawn } from "./Pieces/Pawn";
import TileSquare from "./TileSquare";
import { EmptyTile } from "./Tiles/EmptyTile";
import { EmptyPiece } from "./Pieces/EmptyPiece";
import { TrojanHorse } from "./Pieces/TrojanHorse";
import { Wall } from "./Tiles/Wall";
import { OrangePortal } from "./Tiles/OrangePortal";
import { BluePortal } from "./Tiles/BluePortal";


const Board = () => {
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);
    const [selectingAction, setSelectingAction] = useState<string | null>(null);

    const [castlingRights, setCastingRights] = useState<Array<boolean>>([true, true, true, true]);
    const [enPassantSquare, setEnPassantSquare] = useState<Array<number | null>>([null, null]);

    const [whiteToPlay, setWhiteToPlay] = useState(true);
    const [whitePOV, setwhitePOV] = useState(false);

    const [isDragging, setDragging] = useState(false);
    // const [moveCount, setMoveCount] = useState(0);

    const [pieces, setPieces] = useState<(Piece)[][]>(
    [
        [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)],
        [new Knight(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
        [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false),  new Bishop(false)],
        [new Queen(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Queen(false)],
        [new King(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new King(false)],
        [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Bishop(false)],
        [new TrojanHorse(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
        [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)]
    ]
    );

    const [cards, setCards] = useState<string[]>([]);
    // ["atomic-bomb", "iron-weight", "place-wall", "villager-uprising", "knookify", "place-portal"]

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

    const [tiles, setTiles] = useState<(Tile)[][]>(Array.from({ length: 8 }, () => Array(8).fill(new EmptyTile())));
    useEffect(() => {
        const temp = Array.from({ length: 8 }, () => Array(8).fill(new EmptyTile()))

        temp[0][0] = new Wall();
        temp[3][4] = new OrangePortal();
        temp[4][3] = new BluePortal();
        console.log(temp);
        setTiles(temp)
    
    }, []) 


    const [highlighted, setHighlighted] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)))
    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)))

    const boardHasAtLeastOne = (piece: Piece) => {
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(piece.toString() === pieces[x][y].toString()) return true;
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
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));
    }

    const getAllSeenSquares = (pieces: (Piece)[][], byWhite: boolean) => {

        let allMoves: number[][] = [];

        pieces.forEach((row, i) => {
            row.forEach((piece, j) => {
                if(piece !== null) {
                    if(piece.isWhite && !byWhite || !piece.isWhite && byWhite) return;

                    let moves = generateLegalMoves(i, j, pieces, tiles, castlingRights, enPassantSquare, true);
    
                    for(const tuple of moves) {
                        if(!allMoves.includes(tuple)) {
                            allMoves.push(tuple);
                        }
                    }
                }

                
            })
        })

        return allMoves;
    }

    const validateAndUpdateGame = async (nextX: number, nextY: number) => {
        let newPieces = [...pieces];
        let newTiles = [...tiles];
        let movePlayed = false;

        if(selectedX !== null && selectedY !== null) {
            // Verify if move is legal
            const movingPiece = newPieces[selectedX][selectedY];

    
            if(movingPiece !== null && !movingPiece.isNeutral && ((whiteToPlay && !movingPiece.isWhite) || !whiteToPlay && movingPiece.isWhite)) {
                deselectAll();
                return;
            }
    
            const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, pieces, tiles, castlingRights, enPassantSquare);
            
            for(let i = 0; i < legalMoves.length; i++) {
                if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([nextX, nextY]))) {

                    // A capture happened!
                    const pieceBefore = newPieces[nextX][nextY];

                    newPieces[nextX][nextY] = movingPiece;
                    newPieces[selectedX][selectedY] = new EmptyPiece();

                    if(pieceBefore !== null && movingPiece !== null) {
                        movingPiece.onCapture(nextX, nextY, pieces);
                        pieceBefore.onGetsCaptured(nextX, nextY, pieces);
                    }
    
                    
                    movePlayed = true;
                    break;
                }
            }
    
            if(!movePlayed) {
                deselectAll();
                return;
            }
        } else if (selectingAction !== null) {
            // An action card was played; no piece was moved.

            // Do the card's effect
            [newPieces, newTiles] = getCardAction(selectingAction).onUse(nextX, nextY, newPieces, tiles);

            // Update state
            const newCards = [...cards];
            const idx = cards.indexOf(selectingAction);
            if(idx !== -1) newCards.splice(idx, 1);
            setCards(newCards)
            setTiles(newTiles);

            setSelectedX(null);
            setSelectedY(null);
            movePlayed = true;
        } else {
            return;
        }

        const updatedGameState = handleCastlingPromotionEnPassant(nextX, nextY, selectedX, selectedY, pieces, castlingRights, enPassantSquare);

        newPieces = updatedGameState.pieces;
        setCastingRights(updatedGameState.castlingRights);
        setEnPassantSquare(updatedGameState.enPassantSquare);

        // Special pieces
        let bufferPieces = [...newPieces.map(row => [...row])];

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const result = pieces[x][y]?.onMoveEnd(x, y, bufferPieces);

                if(result) bufferPieces = result;
            }
        }
        
        // Special tiles
        const result = await newTiles[nextX][nextY]?.onPieceLandHere(nextX, nextY, bufferPieces, newTiles);

        if(result) bufferPieces = result;

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                const result = await newTiles[x][y]?.onMoveEnd(x, y, bufferPieces, newTiles);

                if(result) bufferPieces = result;
            }
        }

        setPieces(bufferPieces);
        setTiles(newTiles);

        // Check if in check :)
        let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))

        if (selectedX !== null && selectedY !== null) {
            newPreviousMove[selectedX][selectedY] = 2; // Destination
            newPreviousMove[nextX][nextY] = 1 // origin
        }

        
        getAllSeenSquares(bufferPieces, whiteToPlay).forEach((coords) => {
            let x = coords[0];
            let y = coords[1];

            if(!whiteToPlay && pieces[x][y].toString() === "white-king" || whiteToPlay && pieces[x][y].toString() === "black-king") {
                console.log("check!");
                newPreviousMove[x][y] = 3; // check
            }
        })
        setPreviousMove(newPreviousMove);


        if (movePlayed) setWhiteToPlay(!whiteToPlay);
        
        setSelectedX(null);
        setSelectedY(null);
        setSelectingAction(null);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));


        let whiteKingIsAlive = boardHasAtLeastOne(new King(true));
        let blackKingIsAlive = boardHasAtLeastOne(new King(false));

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

        if(selectingAction !== null) {
            deselectAll();
            const legalPlays: number[][] = generateLegalPlays(selectingAction, whiteToPlay, pieces, tiles);

            // Check if we're trying to play on a square where this action allows it
            const check = [nextX, nextY]
            
            if(!legalPlays.some(coord => coord.every((value, idx) => value === check[idx]))) {
                setSelectingAction(null);
                return;
            }
            validateAndUpdateGame(nextX, nextY);
            
        // Highlighting a new piece
        } else if (selectedX === null || selectedY === null) {
            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, pieces, tiles, castlingRights, enPassantSquare);

            setSelectedX(nextX);
            setSelectedY(nextY);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(0));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = 1;

                let movingPiece = pieces[nextX][nextY];

                // Warn if king is self-threatening
                if(movingPiece instanceof King) {
                    getAllSeenSquares(pieces, !movingPiece.isWhite).forEach((coords) => {
                        let [x,y] = [coords[0], coords[1]];
                        
                        if(legalMoves.some(move => move[0] === x && move[1] === y)) {
                            newHighlighted[x][y] = 2; // check
                        }
                    })
                }
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

    const handleCardSelect = (card: string) => {
        if(selectingAction) {
            setSelectingAction(null);
            deselectAll();
            return;
        } 

        setSelectingAction(card);

        const legalPlays: number[][] = generateLegalPlays(card, whiteToPlay, pieces, tiles);

        let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(0));
            
        legalPlays.forEach((move) => {
            newHighlighted[move[0]][move[1]] = 1;
        })
        setHighlighted(newHighlighted);
    
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
        x: whitePOV ? index % 8 : 7 - (index % 8),
        y: whitePOV ? 7 - Math.floor(index / 8) :  Math.floor(index / 8),
        isSelected: whitePOV ? (selectedX === index % 8 && selectedY === 7 - Math.floor(index / 8)) 
                             : (selectedX === 7 - (index % 8) && selectedY === Math.floor(index / 8)) 
        // piece: pieces[(index % 8)][7 - Math.floor(index / 8)]
    }));

    const handleTileRightClick = (x: number, y: number) => {
        setPreviousMove(prev => {
            const newMove = prev.map(innerArray => [...innerArray]);

            if(newMove[x][y] > 0) return newMove;
            
            newMove[x][y] = newMove[x][y] === 0 ? -1 : 0;
            
            return newMove;
        });
    }

    const idToX = (id: number) => {
        return whitePOV ? id % 8 : 7 - (id % 8);
    }

    const idToY = (id: number) => {
        return whitePOV ? 7 - Math.floor(id / 8) :  Math.floor(id / 8)
    }

    return (
        <>
            <div id="board" style={isDragging ? {cursor: "grabbing"} : {}} onMouseDown={handlePieceDown} onMouseMove={(e) => handlePieceDragging(e)} onMouseUp={() => setDragging(false)} className="board">
                {tilesBlueprint.map(tile => (
                    <TileSquare
                        key={tile.key}
                        id={tile.id}
                        x={tile.x}
                        y={tile.y}
                        isSelected={tile.isSelected}
                        isBeingDragged={isDragging && tile.isSelected}
                        onSelect={handleTileSelect}
                        onRightClick={handleTileRightClick}
                        onSelectUp={handleTileSelectUp}
                        isHighlighted={highlighted[idToX(tile.id)][idToY(tile.id)]}
                        previousMove={previousMove[idToX(tile.id)][idToY(tile.id)]}
                        piece={pieces[idToX(tile.id)][idToY(tile.id)]}
                        tile={tiles[idToX(tile.id)][idToY(tile.id)]}
                    />
                ))}
            <img id="dragging-piece" src={selectedX !== null && selectedY !== null ? `img/${decodePiece(pieces[selectedX][selectedY])}.png` : "img/empty.png"} alt="" />

            </div>
            <div className="cards">
                {cards.map((card, i) => (
                    <Card
                        key={i}
                        name={card}
                        description={getCardAction(card).desciption}
                        onClick={() => {handleCardSelect(card)}}
                    />
                ))}
            </div>
            {/* <button onClick={() => {setwhitePOV(prev => !prev)}}>Flip board</button> */}
        </>
    )
};


export default Board;
