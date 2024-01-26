import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rook";
        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}