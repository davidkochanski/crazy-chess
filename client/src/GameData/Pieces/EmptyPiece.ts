import { Piece } from "./Piece";

export class EmptyPiece extends Piece {
    constructor () {
        super(true);
        this.name = "empty";
        this.pieceId = "0";
        this.isEmpty = true;
    }
}