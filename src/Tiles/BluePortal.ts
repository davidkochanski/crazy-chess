import ChessState from "../ChessState";
import { getCoords } from "../Moves";
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
                let destX: number | undefined;
                let destY: number | undefined;

                state.tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile instanceof OrangePortal) {
                            destX = x;
                            destY = y;
                        }
                    });
                });
                
                const movingPiece = state.pieces[currX][currY];

                // Create a new ChessState object
                const newState = produce(state, draftState => {
                    if(destX === undefined || destY === undefined) {
                        resolve(state); 
                        return;
                    }

                    draftState.pieces[currX][currY] = new EmptyPiece();
                    draftState.pieces[destX][destY] = movingPiece;

                    draftState.log.push({
                        content: `Whoosh! The portal sucked in the ${movingPiece.name} and it teleported to ${getCoords(destX, destY)}!`,
                        byWhite: draftState.whiteToPlay
                    })
                });
    
                resolve(newState);
            });
        };
    }
}
