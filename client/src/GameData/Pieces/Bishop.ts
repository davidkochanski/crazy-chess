import { Piece } from "./Piece";

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Bishop";
        this.image = "bishop.png";
        this.colour = "#FFF176";
        this.canMoveDiagonally = true;
        this.description = "Bishops can move diagonally."
        this.pieceId = "6b2c1dc7-c035-4318-8e16-6ce15f61cdac";
    }
}