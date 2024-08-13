import { Piece } from "./Piece";

export class RotatedKnight extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "rotatedknight";
        this.canMoveAsRotatedKnight = true;
    }
}