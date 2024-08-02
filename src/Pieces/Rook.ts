import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Rook";
        this.image = "rook.png";
        this.colour = "#81C784"
        this.id = 4;
        this.description = "This castle can slide in straight lines."
        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}