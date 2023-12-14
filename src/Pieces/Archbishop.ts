import { PieceBehaviour } from "./Piece";

export class Archbishop extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsKnight = true;
        this.canMoveDiagonally = true;

    }
}