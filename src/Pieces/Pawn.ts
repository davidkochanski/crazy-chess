import { PieceBehaviour } from "./Piece";

export class Pawn extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsPawn = true;
    }
}