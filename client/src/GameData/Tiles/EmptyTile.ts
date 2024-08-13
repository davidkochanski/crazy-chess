import { Tile } from "./Tile";

export class EmptyTile extends Tile {
    constructor () {
        super();
        this.name = "empty";
    }

    isEmpty = (): boolean => {
        return true;
    }
}