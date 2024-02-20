import ChessState from "../ChessState";
import { getCoords } from "../Moves";
import { EmptyPiece } from "./EmptyPiece";
import { Piece } from "./Piece";

export class Fox extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "fox";
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;
        this.onMoveEnd = (currX: number, currY: number, state: ChessState) => {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            
            state.pieces[currX][currY] = new EmptyPiece();

            state.pieces[x][y] = new Fox(true);

            state.log.push(
                {
                    content: `The fox jumps to ${getCoords(x, y)}!`,
                    byWhite: state.whiteToPlay,
                    author: "CONSOLE",
                }
            );

            return state;
        }
    }
}