import { Tile } from "./Tile";

export class Bow extends Tile {
    constructor() {
        super();
        this.isBlocking = true;
        this.isOccupyable = false;

    }
}