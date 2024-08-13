import { Piece } from "./Piece";

export class RotatedQueen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rotatedqueen";
        this.canMoveOrthagonally = true;
        this.canMoveDiagonally = true;
    }
}