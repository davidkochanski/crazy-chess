import { TileBehaviour } from "./Tile";

export class Bow extends TileBehaviour {
    constructor() {
        super();
        this.isBlocking = true;
        this.isOccupyable = false;

    }
}