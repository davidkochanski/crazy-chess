import { useState, MouseEvent, useEffect, useRef } from "react";
import { Tile } from "./Tiles/Tile";
import { generateLegalMoves, handleCastlingPromotionEnPassant, decodePiece, generateLegalPlays, getCoords } from "./Moves";
import { getCardAction } from "./CardBehaviours";
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
import { Resizable } from 'react-resizable';
import { Wall } from "./Tiles/Wall";
import { OrangePortal } from "./Tiles/OrangePortal";
import { BluePortal } from "./Tiles/BluePortal";
import { CardBehaviour } from "./Cards/Card";

import ChessState from "./ChessState";
import { Log } from "./ChessState";
import { produce } from "immer";
import { Fox } from "./Pieces/Fox";
import { Axolotl } from "./Pieces/Axolotl";
import { PressurePlate } from "./Tiles/PressurePlate";
import { Bow } from "./Tiles/Bow";
import { ICBM } from "./Pieces/ICBM";

import { ResizableBox } from "react-resizable";

const Board = () => {
    const defaultState: ChessState = {
        pieces:  [
            [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)],
            [new TrojanHorse(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
            [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false),  new Bishop(false)],
            [new Queen(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Queen(false)],
            [new King(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new King(false)],
            [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Bishop(false)],
            [new TrojanHorse(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
            [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)]
        ],
        tiles: Array.from({ length: 8 }, () => Array(8).fill(new EmptyTile())),
        whiteCards: [],
        blackCards: [],
        whiteToPlay: true,
        enPassantSquare: [null, null],
        castlingRights: [true, true, true, true],
        log: [{content: "The game has begin!", byWhite: true, author: "CONSOLE"}],
        result: "PENDING"
    };

    const [customPieces, setCustomPieces] = useState<Piece[]>([new Pawn(true), new Knight(true), new Bishop(true), new Rook(true), new Queen(true), new King(true)]);

    const logRef = useRef<HTMLDivElement>(null);
    const [wait, setWait] = useState(false);

    const [chessState, setChessState] = useState<ChessState>(defaultState);
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);
    const [selectingAction, setSelectingAction] = useState<number>(-1);
    const [highlighted, setHighlighted] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)));
    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)));
    const [isDragging, setDragging] = useState(false);
    const [whitePOV, setWhitePOV] = useState(true);

    // useEffect(() => {
    //     const temp = Array.from({ length: 8 }, () => Array(8).fill(new EmptyTile()))

    //     temp[0][0] = new Wall();
    //     temp[6][5] = new OrangePortal();
    //     temp[1][2] = new BluePortal();
    //     temp[6][4] = new PressurePlate();

    //     temp[0][3] = new Bow();
    //     temp[0][4] = new Bow();
    //     temp[0][5] = new Bow();
    //     temp[0][6] = new Bow();
    //     temp[0][7] = new Bow();
    //     temp[0][2] = new Bow();
    //     temp[0][1] = new Bow();
    //     temp[0][0] = new Bow();
        
    //     setChessState(prev => ({
    //         ...prev,
    //         tiles: temp
    //     }))
    
    // }, []) 

    useEffect(() => {
        if(logRef.current) logRef.current.scrollTop = logRef.current?.scrollHeight
    }, [chessState.log])

    useEffect(() => {
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));
    }, [wait])


    const boardHasAtLeastOne = (piece: Piece) => {
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(piece.toString() === chessState.pieces[x][y].toString()) return true;
            }
        }

        return false;
    }

    const deselectAll = () => {
        setSelectedX(null);
        setSelectedY(null);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));
    }

    const getAllSeenSquares = (currentState: ChessState) => {

        let allMoves: number[][] = [];
        const pieces = currentState.pieces;
        const byWhite = currentState.whiteToPlay;

        pieces.forEach((row, i) => {
            row.forEach((piece, j) => {
                if(piece !== null) {
                    if((piece.isWhite && !byWhite) || (!piece.isWhite && byWhite)) return;

                    generateLegalMoves(i, j, {...currentState, whiteToPlay: !currentState.whiteToPlay}, true).forEach((tuple) => {
                        if(!allMoves.includes(tuple)) allMoves.push(tuple);
                    });
                }
            })
        })

        return allMoves;
    }

    const validateAndUpdateGame = async (nextX: number, nextY: number) => {
        if(wait || chessState.result !== "CONTINUE") return;

        setWait(_ => true);

        let movePlayed = false;
        let captureHappened = false;
        let isInCheck = false;
        let moveString = "";
        let halt = false;

        let nextState = produce(chessState, draftState => {
            if(selectedX !== null && selectedY !== null) {
                // Verify if move is legal
                const movingPiece = draftState.pieces[selectedX][selectedY];
    
        
                if(movingPiece instanceof EmptyPiece || ( !movingPiece.isNeutral && ((draftState.whiteToPlay && !movingPiece.isWhite) || !draftState.whiteToPlay && movingPiece.isWhite))) {
                    deselectAll();
                    halt = true;
                    return;
                }
        
                const legalMoves: number[][] = generateLegalMoves(selectedX, selectedY, draftState);
                
                for(let i = 0; i < legalMoves.length; i++) {
                    if(JSON.stringify(legalMoves[i]) === JSON.stringify(Array.from([nextX, nextY]))) {
    
                        // A capture happened!
                        const pieceBefore = draftState.pieces[nextX][nextY];
    
                        draftState.pieces[nextX][nextY] = movingPiece;
                        draftState.pieces[selectedX][selectedY] = new EmptyPiece();
    
                        if(!(pieceBefore instanceof EmptyPiece || movingPiece instanceof EmptyPiece)) {
                            captureHappened = true;
                        }

                        movingPiece.onMove(nextX, nextY, draftState);

                        if(captureHappened) {
                            movingPiece.onCapture(nextX, nextY, draftState);
                            pieceBefore.onGetsCaptured(nextX, nextY, draftState);
                        }

                        movePlayed = true;
                        break;
                    }
                }
        
                if(!movePlayed) {
                    deselectAll();
                    halt = true;
                    return;
                }
            } else if (selectingAction !== null) {
                // An action card was played; no piece was moved.
    
                // // Do the card's effect
                // draftState = getCardAction(selectingAction).onUse(nextX, nextY, draftState);
    
                // // Update state
                // const newCards = [...chessState.whiteCards];
                // const idx = chessState.whiteCards.indexOf(selectingAction);
                // if(idx !== -1) newCards.splice(idx, 1);
    
                // setSelectedX(null);
                // setSelectedY(null);
                // movePlayed = true;
            } else {
                return;
            }
    
            const updatedGameState = handleCastlingPromotionEnPassant(nextX, nextY, selectedX, selectedY, draftState);
    
            draftState.pieces = updatedGameState.pieces;
            draftState.castlingRights = updatedGameState.castlingRights;
            draftState.enPassantSquare = updatedGameState.enPassantSquare;

            // Randomly iterate over each of the pieces and tiles doing their action on turn end
            // so that there's no bias towards either side
            // and it's in God's hands who wins simultanious interactions >:)

    
            // Check if in check :)
            let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))
    
            if (selectedX !== null && selectedY !== null) {
                newPreviousMove[selectedX][selectedY] = 2; // Destination
                newPreviousMove[nextX][nextY] = 1 // origin
            }
    
            
            getAllSeenSquares(draftState).forEach((coords) => {
                let x = coords[0];
                let y = coords[1];
    
                if((!draftState.whiteToPlay && draftState.pieces[x][y] instanceof King && draftState.pieces[x][y].isWhite) 
                  || (draftState.whiteToPlay && draftState.pieces[x][y] instanceof King && !draftState.pieces[x][y].isWhite)) {
                    // newPreviousMove[x][y] = 3; // check
                    isInCheck = true;
                }
            })
            setPreviousMove(newPreviousMove);

            const movingPiece = draftState.pieces[nextX][nextY];
                                    
            if(!(movingPiece instanceof Pawn)) {
                if (["king", "queen", "rook", "bishop"].includes(movingPiece.name)) {
                    moveString += movingPiece.name.charAt(0).toUpperCase();
                } else if (movingPiece.name === "knight") {
                    moveString += "N";
                } else {
                    moveString += `${movingPiece.name} to `
                }
            } 

            if(selectedX === null) return; // shutup typescript
            
            if(captureHappened) {
                if(movingPiece instanceof Pawn) {
                    moveString += `${String.fromCharCode(97 + selectedX)}x`;
                } else {
                    moveString += "x";
                }
            }

            moveString += String.fromCharCode(97 + nextX);
            moveString += nextY + 1;

            if(movingPiece instanceof King) {
                if((chessState.castlingRights[0] && nextX === 6 && nextY === 0) ||
                (chessState.castlingRights[2] && nextX === 6 && nextY === 7)) {
                    moveString = "O-O";
                } else if((chessState.castlingRights[1] && nextX === 2 && nextY === 0) ||
                (chessState.castlingRights[3] && nextX === 2 && nextY === 7)) {
                    moveString = "O-O-O";
                }
            }

            if(movingPiece instanceof Pawn) {
                if(nextX === chessState.enPassantSquare[0] && nextY === chessState.enPassantSquare[1]) {
                    moveString = `${String.fromCharCode(97 + selectedX)}x${getCoords(nextX, nextY)}. Holy Hell!`;
                }
            }

            if(isInCheck) moveString += "+";


            // I want the move string to always be the first message of the turn.
            const tempLogs = [...chessState.log];

            tempLogs.push({
                    content: `${draftState.whiteToPlay ? "White" : "Black"} plays ${moveString}${moveString.charAt(moveString.length-1) === "!" ? "" : "."}`,
                    byWhite: draftState.whiteToPlay,
                    author: draftState.whiteToPlay ? "WHITE_MOVE" : "BLACK_MOVE",
                }
            )

            for(let i = tempLogs.length - 1; i < draftState.log.length; i++) {
                tempLogs.push(draftState.log[i]);
            }

            draftState.log = [...tempLogs];

        })

        if(halt) {
            deselectAll();
            setWait(_ => false);
            return;
        }
    
        setChessState(nextState);
    
        let indicies = Array.from({length: 64}, (_, i) => i); // [0,1,2,...,63]
    
        const nextPieces = nextState.pieces.map(inner => inner.slice());
        const nextTiles = nextState.tiles.map(inner => inner.slice());
    
        // Shuffle
        indicies = indicies.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
    
        nextState = await nextState.tiles[nextX][nextY]?.onPieceLandHere(nextX, nextY, nextState);
        setChessState(nextState);
    
        for (let id of indicies) {
            let x = id % 8;
            let y = 7 - Math.floor(id / 8);
    
            if (nextPieces[x][y]) {
                nextState = await nextPieces[x][y].onMoveEnd(x, y, nextState);
                setChessState(nextState);
            }
        }
    
        for (let id of indicies) {
            let x = id % 8;
            let y = 7 - Math.floor(id / 8);
    
            if (nextTiles[x][y]) {
                nextState = await nextTiles[x][y].onMoveEnd(x, y, nextState);
                setChessState(nextState);
            }
        }
    
        setChessState(prev => ({...prev, whiteToPlay: !prev.whiteToPlay}));
        setWait(_ => false);
    
        setSelectedX(null);
        setSelectedY(null);
        setSelectingAction(-1);
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));
    
        let whiteKingIsAlive = false;
        let blackKingIsAlive = false;
    
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(nextState.pieces[x][y] instanceof King) {
                    if(nextState.pieces[x][y].isWhite) {
                        whiteKingIsAlive = true;
                    } else {
                        blackKingIsAlive = true;
                    }
                }
            }
        }

        // Check if in check :)
        let newPreviousMove = Array.from({ length: 8 }, () => Array(8).fill(0))

        if (selectedX !== null && selectedY !== null) {
            newPreviousMove[selectedX][selectedY] = 2; // Destination
            newPreviousMove[nextX][nextY] = 1 // origin
        }

        
        getAllSeenSquares(nextState).forEach((coords) => {
            let x = coords[0];
            let y = coords[1];

            if((!nextState.whiteToPlay && nextState.pieces[x][y] instanceof King && nextState.pieces[x][y].isWhite) 
                || (nextState.whiteToPlay && nextState.pieces[x][y] instanceof King && !nextState.pieces[x][y].isWhite)) {
                newPreviousMove[x][y] = 3; // check
                isInCheck = true;
            }
        })
        setPreviousMove(newPreviousMove);
    
        // Temp
        if(!whiteKingIsAlive && !blackKingIsAlive) {
            setChessState(prev => ({
                ...prev,
                result: "DRAW",
                log: [...prev.log, {"content": "It\'s a draw.", "author": "CONSOLE"}]
            }));
            setTimeout(() => {alert("DRAW")}, 50);
            return;
        }
    
        if(!whiteKingIsAlive) {
            setChessState(prev => ({
                ...prev,
                result: "BLACK_WON",
                log: [...prev.log, {"content": "Black won!", "author": "CONSOLE"}]
            }));
            setTimeout(() => {alert("Black wins!")}, 50);
            return;
        }
    
        if(!blackKingIsAlive) {
            setChessState(prev => ({
                ...prev,
                result: "WHITE_WON",
                log: [...prev.log, {"content": "White won!", "author": "CONSOLE"}]
            }));
            
            setTimeout(() => {alert("White wins!")}, 50);
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
        console.log(chessState.result);

        if(wait || (chessState.result !== "CONTINUE" && chessState.result !== "PENDING")) return;

        if(chessState.result === "PENDING" && selectingAction !== -1) {
            setChessState(prev => {
                prev.pieces[nextX][nextY] = customPieces[selectingAction];

                return prev;
            })
            return;
            
        // Highlighting a new piece
        } else if (selectedX === null || selectedY === null) {
            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, chessState);

            setSelectedX(nextX);
            setSelectedY(nextY);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(0));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = 1;

                let movingPiece = chessState.pieces[nextX][nextY];

                // Warn if king is self-threatening
                if(movingPiece instanceof King) {
                    getAllSeenSquares({...chessState, whiteToPlay: !movingPiece.isWhite}).forEach((coords) => {
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

    // const handleCardSelect = (e: MouseEvent, piece: Piece) => {
    //     setSelectingAction();
    
    // }

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
        <div className="game-content">
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
                        piece={chessState.pieces[idToX(tile.id)][idToY(tile.id)]}
                        tile={chessState.tiles[idToX(tile.id)][idToY(tile.id)]}
                        isWhitePOV={whitePOV}
                    />
                ))}
            <img id="dragging-piece" src={selectedX !== null && selectedY !== null ? `img/${decodePiece(chessState.pieces[selectedX][selectedY])}.png` : "img/empty.png"} alt="" />

            </div>


            <aside>

            <div className="cards">
                {customPieces.map((piece, i) => (
                    <Card
                        key={i}
                        name={piece.name}
                        image={piece.toString()}
                        description={piece.description}
                        colour={piece.colour}
                        onClick={() => setSelectingAction(i)}
                        selected={selectingAction === i}
                    />
                ))}
            </div>

            <div ref={logRef} id="log" className="log" >
                {chessState.log.map((eachLog, i) => 
                    <div className={`log-entry ${(eachLog.author !== undefined ? eachLog.author : (eachLog.byWhite ? "WHITE" : "BLACK")).toLowerCase()}`} key={i}>
                        <div className={`log-node`}></div><p>{eachLog.content}</p>
                    </div>
                )}
            </div>

            <div className="button-array">
                {chessState.result === "PENDING" ? <button onClick={()=> {setChessState(state => {return {...state, result: "CONTINUE"}}); setSelectingAction(-1)}}>Start Game</button> : <></>}
                {<button onClick={() => {setWhitePOV(prev => !prev)}}>Flip board</button>}
                {wait && <div className="wait"><img src="img/hourglass.png" alt="..." /></div>}
            </div>
        

            </aside>


        </div>
    )
};


export default Board;
