import { Piece } from "./Piece";

export class RotatedQueen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rotatedqueen";
        this.canMoveOrthogonally = true;
        this.canMoveDiagonally = true;
    }
}