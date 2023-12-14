import { PieceBehaviour } from "./Piece";

export class Duck extends PieceBehaviour {
    constructor() {
        super();
        this.isMovableByPlayer = true;
        this.isCapturable = false;
        this.isNeutral = true;
        this.canMoveAnywhere = true;
    }
}