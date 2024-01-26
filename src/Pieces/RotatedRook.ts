import { Piece } from "./Piece";

export class RotatedRook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rotatedrook";
        this.canMoveDiagonally = true;
        this.isCastleable = true;
    }
}