import { PieceBehaviour } from "./Piece";

export class Fox extends PieceBehaviour {
    constructor() {
        super();
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;
        this.onMoveEnd = (currX: number, currY: number, pieces: string[][]) => {
            const x = Math.floor(Math.random() * 8);
            const y = Math.floor(Math.random() * 8);
            
            pieces[currX][currY] = '-';

            pieces[x][y] = 'FOX';

            return pieces;
        }
    }
}