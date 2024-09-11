import { Piece } from "./Piece";

export class RotatedBishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rotatedbishop";
        this.canMoveOrthogonally = true;
    }
}