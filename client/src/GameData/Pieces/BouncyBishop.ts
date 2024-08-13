import { Piece } from "./Piece";

export class BouncyBishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "bouncybishop";
        this.canMoveDiagonally = true;
        this.isBouncy = true;
    }
}