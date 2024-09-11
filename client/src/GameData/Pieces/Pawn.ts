import { Piece } from "./Piece";

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Pawn";
        this.image = "pawn.png";
        this.colour = "#E57373";
        this.description = "Basic chessmen. Can move forwards, sometimes twice, can promote, and can even en passant."
        this.canMoveAsPawn = true;
        this.canEnPassant = true;
        this.id = "7bf1003d-b152-4a26-82a0-7d34cb25b58d";
    }
}