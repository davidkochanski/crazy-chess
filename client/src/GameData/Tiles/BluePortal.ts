import ChessState from "../scripts/ChessState";
import { decodePiece, getCoords } from "../scripts/Moves";
import { EmptyPiece } from "../Pieces/EmptyPiece";
import { OrangePortal } from "./OrangePortal";
import { Tile } from "./Tile";

import { produce } from "immer";

export class BluePortal extends Tile {
    constructor() {
        super();
        this.name = "blueportal"
        this.onPieceLandHere = (currX: number, currY: number, state: ChessState) => {
            return new Promise((resolve) => {
                let destX: number;
                let destY: number;

                state.tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile instanceof OrangePortal) {
                            destX = x;
                            destY = y;
                        }
                    });
                });
                
                const movingPiece = state.pieces[currX][currY];
                const prevPiece = document.querySelector(`#tile-${currX}-${currY} > .piece-img`) as HTMLImageElement;

                if(!prevPiece) { resolve(state); return; }

                prevPiece.src = "img/empty.png"

                const newState = produce(state, draftState => {
                    if(destX === undefined || destY === undefined) {
                        resolve(state); 
                        return;
                    }


                    draftState.pieces[currX][currY] = new EmptyPiece();
                    draftState.pieces[destX][destY] = movingPiece;
                    draftState.enPassantSquare = [null, null];
                    draftState.log.push({
                        content: `Whoosh! The portal sucked in the ${movingPiece.name} and it teleported to ${getCoords(destX, destY)}!`,
                        byWhite: draftState.whiteToPlay
                    })
                });


                const prevPieceAnimation = prevPiece?.animate([{scale: "1 1"},{scale: "0 1"}], {duration: 250})
                

                prevPieceAnimation.onfinish = () => {
                    prevPiece.src = "img/empty.png";

                    const nextPiece = document.querySelector(`#tile-${destX}-${destY}`);
                    const nextPieceImg = document.createElement("img");
                    nextPieceImg.classList.add("anim");
                    nextPieceImg.src = `img/${decodePiece(movingPiece)}.png`
                    nextPiece?.appendChild(nextPieceImg);

                    const nextPieceAnimation = nextPieceImg.animate([{scale: "0 1"},{scale: "1 1"}], {duration: 250})

                    nextPieceAnimation.onfinish = () => {
                        nextPieceImg.remove();
                        resolve(newState);
                        const tileElement = document.querySelector(`#tile-${destX}-${destY}`);
                        if (tileElement) {
                            const tileWidth = tileElement.clientWidth;
                            const pieceImage = document.querySelector(`#tile-${destX}-${destY} > .piece-img`) as HTMLImageElement;
                            if (pieceImage) {
                                pieceImage.style.width = `${tileWidth}px`;
                                prevPiece.style.scale = "1 1";

                            }
                        }
                    }

                }
            });
        };
    }
}
