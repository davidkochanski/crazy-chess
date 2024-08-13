import { CardBehaviour } from "./Card";

export class PlacePortal extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Place a pair of symmetrical portals.";
        this.canBeUsedOnEmptySquares = true;
        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            tiles[currX][currY] = "blue-portal";
            tiles[7-currX][7-currY] = "orange-portal";

            return [pieces, tiles];
        }
    }
}