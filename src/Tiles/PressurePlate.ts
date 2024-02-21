import { produce } from "immer";
import ChessState from "../ChessState";
import { Bow } from "./Bow";
import { Tile } from "./Tile";
import { EmptyPiece } from "../Pieces/EmptyPiece";

export class PressurePlate extends Tile {
    constructor() {
        super();
        this.name = "pressureplate";
        this.onPieceLandHere = async (currX: number, currY: number, state: ChessState) => {
            return new Promise(async (resolve) => {

                let nextPieces = state.pieces.map(inner => inner.slice());

                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (state.tiles[i][j] instanceof Bow) {

                            const deletingPiece = await (state.tiles[i][j] as Bow).fireEvent(i, j, state);
    
                            if (JSON.stringify(deletingPiece) !== JSON.stringify([-1, -1])) {
                                nextPieces[deletingPiece[0]][deletingPiece[1]] = new EmptyPiece();
                            }
                        }
                    }
                }
    
                const newState = produce(state, draftState => {
                    draftState.pieces = nextPieces;
                });
    
                resolve(newState);
            })
        };
    }
}
