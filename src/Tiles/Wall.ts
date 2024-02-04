import { Tile } from "./Tile";

export class Wall extends Tile {
    constructor() {
        super();
        this.name = "wall";
        this.isBlocking = true;
        this.isOccupyable = false;
    }
}