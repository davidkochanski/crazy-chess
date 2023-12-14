import { TileBehaviour } from "./Tile";

export class Wall extends TileBehaviour {
    constructor() {
        super();
        this.isBlocking = true;
        this.isOccupyable = false;
    }
}