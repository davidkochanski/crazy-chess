import { useState, MouseEvent, useEffect, useRef } from "react";
// import { Tile } from "./Tiles/Tile";
import { generateLegalMoves, handleCastlingPromotionEnPassant, getCoords } from "./Moves";
// import { getCardAction } from "./CardBehaviours";
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
import { HexColorPicker } from "react-colorful";
// import { TrojanHorse } from "./Pieces/TrojanHorse";
// import { Resizable } from 'react-resizable';
// import { Wall } from "./Tiles/Wall";
// import { OrangePortal } from "./Tiles/OrangePortal";
// import { BluePortal } from "./Tiles/BluePortal";
// import { CardBehaviour } from "./Cards/Card";

import ChessState, { Log } from "./ChessState";
// import { Log } from "./ChessState";
import { produce } from "immer";
// import { Fox } from "./Pieces/Fox";
// import { Axolotl } from "./Pieces/Axolotl";
// import { PressurePlate } from "./Tiles/PressurePlate";
// import { Bow } from "./Tiles/Bow";
// import { ICBM } from "./Pieces/ICBM";

// import { ResizableBox } from "react-resizable";
import Color from "color";
import _ from 'lodash';
import PropertySwitch from "./PropertySwitch";
import { toImage } from "./TileSquare";
import { Camel } from "./Pieces/Camel";
import { Knook } from "./Pieces/Knook";
import { Villager } from "./Pieces/Villager";
import { NewPiece } from "./Pieces/NewPiece";
import ImageSelectionButton from "./ImageSelectionButton";

const Board = () => {
    const defaultState: ChessState = {
        pieces:  [
            [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)],
            [new Knight(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
            [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false),  new Bishop(false)],
            [new Queen(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Queen(false)],
            [new King(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new King(false)],
            [new Bishop(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Bishop(false)],
            [new Knight(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Knight(false)],
            [new Rook(true), new Pawn(true), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new EmptyPiece(), new Pawn(false), new Rook(false)]
        ],
        tiles: Array.from({ length: 8 }, () => Array(8).fill(new EmptyTile())),
        whiteCards: [],
        blackCards: [],
        whiteToPlay: true,
        enPassantSquare: [null, null],
        castlingRights: [true, true, true, true],
        log: [],
        result: "PENDING"
    };


    const logRef = useRef<HTMLDivElement>(null);
    const [wait, setWait] = useState(false);

    const [chessState, setChessState] = useState<ChessState>(defaultState);
    const [selectedX, setSelectedX] = useState<number | null>(null);
    const [selectedY, setSelectedY] = useState<number | null>(null);
    const [highlighted, setHighlighted] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)));
    const [previousMove, setPreviousMove] = useState<Array<Array<number>>>(Array.from({ length: 8 }, () => Array(8).fill(0)));
    const [isDragging, setDragging] = useState(false);
    const [whitePOV, setWhitePOV] = useState(true);

    const [settingWhite, setSettingWhite] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [customPieces, setCustomPieces] = useState<Piece[]>([new Pawn(true), new Knight(true), new Bishop(true), new Rook(true), new Queen(true), new King(true), new Camel(true), new Knook(true), new Villager(true)]);

    const [selectingAction, setSelectingAction] = useState<number>(-1);
    const [tempSelected, setTempSelected] = useState<Piece | null>(null);

    const [isEditingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [isEditingDesc, setEditingDesc] = useState(false);
    const [newDesc, setNewDesc] = useState("");

    const [isEditingColour, setEditingColour] = useState(false);
    const [colour, setColour] = useState("#123456");

    const [nextId, setNextId] = useState(customPieces.length);

    useEffect(() => {
        if(logRef.current) logRef.current.scrollTop = logRef.current?.scrollHeight
    }, [chessState.log])

    useEffect(() => {
        setHighlighted(Array.from({ length: 8 }, () => Array(8).fill(0)));
    }, [wait])

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

                    generateLegalMoves(i, j, {...currentState, whiteToPlay: !currentState.whiteToPlay}, true, true).forEach((tuple) => {
                        if(!allMoves.includes(tuple)) allMoves.push(tuple);
                    });
                }
            })
        })

        return allMoves;
    }

    const validateAndUpdateGame = async (nextX: number, nextY: number) => {
        if(chessState.result === "PENDING") {
            deselectAll();
            return;
        }
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

            if(movingPiece.canEnPassant) {
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
    
        let whiteHasRoyalPiece = false;
        let blackHasRoyalPiece = false;
    
        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                if(nextState.pieces[x][y].isRoyal) {
                    if(nextState.pieces[x][y].isWhite) {
                        whiteHasRoyalPiece = true;
                    } else {
                        blackHasRoyalPiece = true;
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

            if((!nextState.whiteToPlay && nextState.pieces[x][y].isRoyal && nextState.pieces[x][y].isWhite) 
                || (nextState.whiteToPlay && nextState.pieces[x][y].isRoyal && !nextState.pieces[x][y].isWhite)) {
                newPreviousMove[x][y] = 3; // check
                isInCheck = true;
            }
        })
        setPreviousMove(newPreviousMove);
    
        // Temp
        if(!whiteHasRoyalPiece && !blackHasRoyalPiece) {
            setChessState(prev => ({
                ...prev,
                result: "DRAW",
                log: [...prev.log, {"content": "It\'s a draw.", "author": "CONSOLE"}]
            }));
            setTimeout(() => {alert("DRAW")}, 50);
            return;
        }
    
        if(!whiteHasRoyalPiece) {
            setChessState(prev => ({
                ...prev,
                result: "BLACK_WON",
                log: [...prev.log, {"content": "Black won!", "author": "CONSOLE"}]
            }));
            setTimeout(() => {alert("Black wins!")}, 50);
            return;
        }
    
        if(!blackHasRoyalPiece) {
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
        if(wait || (chessState.result !== "CONTINUE" && chessState.result !== "PENDING")) return;


        if(chessState.result === "PENDING" && selectingAction !== -1) {
            setChessState(prev => {
                if(selectingAction === -2) {
                    const nextPiece = new EmptyPiece();
    
                    prev.pieces[nextX][nextY] = nextPiece;
    
                    return prev;
                }

                const nextPiece = _.cloneDeep(customPieces[selectingAction]);
                nextPiece.isWhite = settingWhite; 

                prev.pieces[nextX][nextY] = nextPiece;

                return prev;
            })
            return;

        } else if (selectedX === null || selectedY === null) {
            const legalMoves: number[][] = generateLegalMoves(nextX, nextY, chessState);

            setSelectedX(nextX);
            setSelectedY(nextY);

            let newHighlighted = Array.from({ length: 8 }, () => Array(8).fill(0));
            
            legalMoves.forEach((move) => {
                newHighlighted[move[0]][move[1]] = 1;

                let movingPiece = chessState.pieces[nextX][nextY];

                // Warn if king is self-threatening
                if(movingPiece.isRoyal) {
                    getAllSeenSquares({...chessState, whiteToPlay: !movingPiece.isWhite}).forEach((coords) => {
                        let [x,y] = [coords[0], coords[1]];
                        
                        if(legalMoves.some(move => move[0] === x && move[1] === y)) {
                            newHighlighted[x][y] = 2; // check
                        }
                    })
                }
            })
            setHighlighted(newHighlighted);

            
        // Highlighting a new piece
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

    const handleShowThisModal = (i: number) => {
        // if(chessState.result !== "PENDING") return;

        setTempSelected(_.cloneDeep(customPieces[i]));
        setSelectingAction(i);
        setShowModal(true);
        setColour(customPieces[i].colour); // the react-colourful package needs its own state

    }

    const deleteCard = (id: number) => {
        if(chessState.result !== "PENDING") return;
        setCustomPieces(pieces => {
            return pieces.filter((piece) => {return piece.id !== id})
        })

        setChessState(prevChessState => {
            for(let i = 0; i < 8; i++) {
                for(let j = 0; j < 8; j++) {
                    if(prevChessState.pieces[i][j].id === id) {
                        prevChessState.pieces[i][j] = new EmptyPiece();
                    }
                }
            }
            return prevChessState;
        })

    }

    const updatePieceBehaviours = () => {
        if (tempSelected === null) return;
    
        setCustomPieces(prevPieces => {
            return prevPieces.map(piece => 
                piece.id === tempSelected.id ? _.cloneDeep(tempSelected) : piece
            );
        });

        setChessState(prevState => {
            const newPieces = prevState.pieces.map(row =>
                row.map(piece => {
                    if (piece.id === tempSelected.id) {
                        const newPiece = _.cloneDeep(tempSelected);
                        newPiece.isWhite = piece.isWhite;
                        return newPiece;
                    }
                    return piece;
                })
            );
    
            return {
                ...prevState,
                pieces: newPieces
            };
        });
    
        setTempSelected(null);
    };
    
    

    return (
        <div className="game-content">
            <div className="modal" style={{ display: showModal ? "grid" : "none", color: Color(tempSelected?.colour).isLight() ? 'black' : 'white' }}>
                <div className="modal-content" style={{ backgroundColor: tempSelected?.colour || "white" }}>
                    <div className="modal-top" style={{ backgroundColor: tempSelected?.colour || "white", filter: "brightness(0.75)" }}></div>
                    <h2 className="modal-top-text">
                        {isEditingName ? (
                            <div className="modal-name-input">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value.length <= 16 ? e.target.value : e.target.value.substring(0, 16))}
                                    onBlur={() => {
                                        if(!tempSelected) return;
                                        setCustomPieces(prev => {
                                            const updatedPieces = [...prev];
                                            tempSelected.name = newName || tempSelected.name;
                                            return updatedPieces;
                                        });
                                        setEditingName(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if(!tempSelected) return;
                                            setCustomPieces(prev => {
                                                const updatedPieces = [...prev];
                                                tempSelected.name = newName || tempSelected.name;
                                                return updatedPieces;
                                            });
                                            setEditingName(false);
                                        } else if(e.key === "Escape") {
                                            setEditingName(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <>
                                {tempSelected?.name || "undefined"}
                                <button className="inline-button" onClick={() => {
                                    setNewName(tempSelected?.name || "");
                                    setEditingName(true);
                                }}>
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                            </>
                        )}
                    </h2>

                    <button className="modal-close" onClick={() => {
                        updatePieceBehaviours();
                        setShowModal(false);
                        setEditingName(false);
                        setEditingDesc(false);
                    }}>
                        <i className="fa-solid fa-x"></i>
                    </button>

                    <div className="modal-description">
                    {isEditingDesc ? (
                            <div className="modal-desc-input">
                                <input
                                    type="text"
                                    value={newDesc}
                                    onChange={(e) => setNewDesc(e.target.value.length <= 140 ? e.target.value : e.target.value.substring(0, 140))}
                                    onBlur={() => {
                                        if(!tempSelected) return;

                                        setCustomPieces(prev => {
                                            const updatedPieces = [...prev];
                                            tempSelected.description = newDesc || tempSelected.description;
                                            return updatedPieces;
                                        });
                                        setEditingDesc(false);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            if(!tempSelected) return;
                                            setCustomPieces(prev => {
                                                const updatedPieces = [...prev];
                                                tempSelected.description = newDesc || tempSelected.description;
                                                return updatedPieces;
                                            });
                                            setEditingDesc(false);
                                        } else if(e.key === "Escape") {
                                            setEditingDesc(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <>
                                {tempSelected?.description || "undefined"}
                                <button className="inline-button" onClick={() => {
                                    setNewDesc(tempSelected?.description || "");
                                    setEditingDesc(true);
                                }}>
                                    <i className="fa-solid fa-pencil"></i>
                                </button>
                            </>
                        )}



                        {isEditingColour ?
                            <div className="editing-colour">
                                <button onClick={() => {
                                    setEditingColour(false);
                                    if (tempSelected) tempSelected.colour = colour;
                                }}> 
                                
                                <i className="fa-solid fa-check"></i></button>

                                <HexColorPicker className="colour-picker" color={tempSelected?.colour || "#000000"} onChange={setColour} />

                            </div>
                            :
                            <button className="edit-colour" onClick={() => { setEditingColour(true) }}>
                                <i className="fa-solid fa-paint-brush">
                                </i>
                            </button>}
                    </div>

                    <div id="modal-img-array" className="modal-img-array">
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="pawn.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="knight.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="bishop.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="rook.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="queen.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="king.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="camel.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="knook.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="villager.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="icbm.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="grassh.png"/>
                        <ImageSelectionButton tempSelected={tempSelected} setTempSelected={setTempSelected} image="amazon.png"/>
                    </div>

                    <h3>Attributes</h3>
                    <div className="modal-text">
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveOrthagonally" label="Moves Orthagonally" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveDiagonally" label="Moves Diagonally" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsKnight" label="Moves like a Knight" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsKing" label="Moves like a King" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsPawn" label="Moves like a Pawn" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsCamel" label="Moves like a Camel" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAnywhere" label="Moves to Any Vacant Square" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsGold" label="Moves like a Shogi Gold" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsRotatedKnight" label="Moves like a Rotated Knight" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canMoveAsVillager" label="Moves like a Villager" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="isMovableByPlayer" label="Can Be Moved" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="isCastleable" label="Can Castle" />
                        {/* <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="isNeutral" label=""/> */}
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="isCapturable" label="Can Be Captured" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canCapture" label="Can Capture Others" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="isRoyal" label="Is Royal" />
                        <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="canEnPassant" label="Can En Passant" />
                        {/* <PropertySwitch tempSelected={tempSelected} setTempSelected={setTempSelected} attr="maximumRange" /> */}
                    </div>
                </div>
            </div>

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
            <img id="dragging-piece" src={selectedX !== null && selectedY !== null ? `${toImage(chessState.pieces[selectedX][selectedY])}` : "img/empty.png"} alt="" />

            </div>


            <aside>

            <div className="cards">
                <div className="cards-settings">
                        <button type="button"  onClick={() => {setCustomPieces(prev => {
                            const nextPiece = new NewPiece(true);
                            nextPiece.id = nextId;

                            setNextId(id => id + 1);
                            
                            return [...prev, nextPiece]
                            
                        })}}><i className="fa-solid fa-plus"></i></button>

                        {/* -2 is defined as eraser, -1 is defined as no selection, >0 is the index of the selected card in the cards array. */}
                        <button type="button" style={{border: selectingAction === -2 ? "white 3px solid" : "none"}} onClick={() => {setSelectingAction(prev => prev === -2 ? -1 : -2)}}><i className="fa-solid fa-eraser"></i></button> 


                        <button type="button"  onClick={() => {setSettingWhite(prev => !prev)}}><i className="fa-solid fa-retweet"></i></button>
                </div>
                <div className="cards-container">
                    {customPieces.map((piece, i) => (
                        <Card
                            key={i}
                            piece={piece}
                            onClick={() => {setSelectingAction(prevSelected => prevSelected === i ? -1 : i)}}
                            selected={selectingAction === i}
                            settingWhite={settingWhite}
                            handleShowThisModal={() => handleShowThisModal(i)}
                            deleteCard={() => deleteCard(piece.id)}
                        />
                    ))}
                </div>
            </div>

            <div ref={logRef} id="log" className="log" >
                {chessState.log.map((eachLog, i) => 
                    <div className={`log-entry ${(eachLog.author !== undefined ? eachLog.author : (eachLog.byWhite ? "WHITE" : "BLACK")).toLowerCase()}`} key={i}>
                        <div className={`log-node`}></div><p>{eachLog.content}</p>
                    </div>
                )}
            </div>

            <div className="button-array">
            {chessState.result === "PENDING" ? <button
                    onClick={() => {
                    setChessState((state) => {
                        const whiteHasRoyalPiece = state.pieces.some(row => row.some(piece => piece.isRoyal && piece.isWhite));
                        const blackHasRoyalPiece = state.pieces.some(row => row.some(piece => piece.isRoyal && !piece.isWhite));
                
                        if (whiteHasRoyalPiece && blackHasRoyalPiece) {
                            setSelectingAction(-1);
                            const nextLog = [...state.log, {content: "The game has begin!", byWhite: true, author: "CONSOLE"}] as Log[];
                            return { ...state, result: "CONTINUE", log: nextLog};
                        } else {
                            const nextLog = [...state.log,  {content: "ERROR: You need at least 1 royal piece of each colour!", byWhite: true, author: "CONSOLE"}] as Log[];
                            return {...state, log: nextLog};
                        }
                        return state;
                    });
                    }}
                >Start Game</button> : 
                
                <button style={{backgroundColor: chessState.whiteToPlay ? "white" : "black", color: chessState.whiteToPlay ? "black" : "white", border: chessState.whiteToPlay ? "none" : "2px solid white"}}> 
                    {chessState.whiteToPlay ? "White to Play" : "Black to Play"}
                </button>
                
                
                
                }

                {<button onClick={() => {setWhitePOV(prev => !prev)}}>Flip board</button>}
                {wait && <div className="wait"><img src="img/hourglass.png" alt="..." /></div>}
            </div>
        

            </aside>


        </div>
    )
};


export default Board;
