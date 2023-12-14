import { CardBehaviour } from "./Card";

export class IronWeight extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Reduce any enemy piece's movement.";
        this.canBeUsedOnEnemyPieces = true;
        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            let piece = pieces[currX][currY];

            piece = "slow-" + piece;

            pieces[currX][currY] = piece;

            return [pieces, tiles];
        }
    }
}