import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rook";
        this.colour = "#81C784"

        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}