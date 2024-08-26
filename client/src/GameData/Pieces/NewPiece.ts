import { Piece } from "./Piece";
export class NewPiece extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "New Piece";
        this.image = "pawn.png";
        this.colour = "#E57373";
        this.id = 0;
    }
}