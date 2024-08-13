import { produce } from "immer";
import ChessState from "../scripts/ChessState";
import { EmptyPiece } from "./EmptyPiece";
import { Piece } from "./Piece";
import { getCoords } from "../scripts/Moves";

export class Axolotl extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "axolotl";
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;

        this.onMoveEnd = (currX: number, currY: number, state: ChessState) => {

            return new Promise((resolve) => {
                let x: number, y: number;
            
                // Wow, an actual usecase for a do while...
                do {
                    const deltaX = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    const deltaY = Math.floor(Math.random() * 3) - 1;
                
                    x = currX + deltaX;
                    y = currY + deltaY;
                } while (!(x >= 0 && x <= 7 && y >= 0 && y <= 7));
                
                resolve(produce(state, draftState => {
                    draftState.pieces[currX][currY] = new EmptyPiece();
                    draftState.pieces[x][y] = new Axolotl(true);

                    if(!(x === currX && y === currY)) {
                        draftState.log.push({
                            content:  `The axolotl crawled to ${getCoords(x, y)}.`,
                            byWhite: state.whiteToPlay
                        })
                    }
                }));
            })

        }
    }
}