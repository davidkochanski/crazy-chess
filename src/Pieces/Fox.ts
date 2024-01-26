import { Piece } from "./Piece";

export class Fox extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "fox";
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;
        this.onMoveEnd = (currX: number, currY: number, pieces: (Piece)[][]) => {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            
            pieces[currX][currY] = null;

            pieces[x][y] = new Fox(true);

            return pieces;
        }
    }
}