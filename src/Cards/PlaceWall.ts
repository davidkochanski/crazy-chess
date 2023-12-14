import { CardBehaviour } from "./Card";

export class PlaceWall extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Place a brick wall.";
        this.canBeUsedOnEmptySquares = true;
        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            tiles[currX][currY] = "wall";
            return [pieces, tiles];
        }
    }
}