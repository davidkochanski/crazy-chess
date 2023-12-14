import { CardBehaviour } from "./Card";

export class AtomicBomb extends CardBehaviour {
    constructor() {
        super();

        this.desciption = "Explode a 3x3 area.";
        this.canBeUsedOnEmptySquares = true;

        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            pieces[currX][currY] = "-";

            for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                    pieces[i][j] = "-";
                }
            }
            return [pieces, tiles];
        }
    }
}