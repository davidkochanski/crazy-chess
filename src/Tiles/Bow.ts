import { Tile } from "./Tile";

export class Bow extends Tile {
    constructor() {
        super();
        this.name = "bow";
        this.isBlocking = true;
        this.isOccupyable = false;

    }
}