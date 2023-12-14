import { PieceBehaviour } from "./Piece";

export class RotatedBishop extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveOrthagonally = true;
    }
}