import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rook";
        this.colour = "#81C784"
        this.id = 4;

        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}