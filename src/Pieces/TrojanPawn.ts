import { Piece } from "./Piece";

export class TrojanPawn extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "trojanpawn";
        this.canMoveAsPawn = true;
    }
}