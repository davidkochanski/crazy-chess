import { PieceBehaviour } from "./Piece";

export class Axolotl extends PieceBehaviour {
    constructor() {
        super();
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;

        this.onMoveEnd = (currX: number, currY: number, pieces: string[][]) => {
            let x, y;
            
            // Wow, an actual usecase for a do while...
            do {
                const deltaX = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                const deltaY = Math.floor(Math.random() * 3) - 1;
            
                x = currX + deltaX;
                y = currY + deltaY;
            } while (!(x >= 0 && x <= 7 && y >= 0 && y <= 7));
            
            pieces[currX][currY] = "-";
            pieces[x][y] = "axolotl";
            
            return pieces;
        }
    }
}