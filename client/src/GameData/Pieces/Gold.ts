import { Piece } from "./Piece";

export class Gold extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "gold";
        this.canMoveAsGold = true;
    }
}