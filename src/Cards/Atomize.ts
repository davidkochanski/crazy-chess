import { CardBehaviour } from "./Card";

export class Atomize extends CardBehaviour {
    constructor() {
        super();

        this.desciption = "Turn one piece atomic.";
        this.canBeUsedOnFriendlyPieces = true;
        this.canBeUsedOnEnemyPieces = true;

        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            let piece = pieces[currX][currY];

            piece = "atomic-" + piece;

            pieces[currX][currY] = piece;

            return [pieces, tiles];
        }
    }
}