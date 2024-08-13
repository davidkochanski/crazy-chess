import { produce } from "immer";
import ChessState from "../scripts/ChessState";
import { Piece } from "./Piece";
import { EmptyPiece } from "./EmptyPiece";

export class ICBM extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "icbm";
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;

        this.onMove = (currX: number, currY: number, state: ChessState) => {
            for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                    state.pieces[i][j] = new EmptyPiece();
                }
            }


            return state;
        }



        this.onCapture = (currX: number, currY: number, state: ChessState) => {
            for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                    state.pieces[i][j] = new EmptyPiece();
                }
            }


            return state;
        }
    }
}