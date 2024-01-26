import { Piece } from "./Piece";

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "pawn";
        this.canMoveAsPawn = true;
    }
}