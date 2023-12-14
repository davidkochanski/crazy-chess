import { PieceBehaviour } from "./Piece";

export class RotatedQueen extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveOrthagonally = true;
        this.canMoveDiagonally = true;
    }
}