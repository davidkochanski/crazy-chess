import { Piece } from "./Piece";

export class Duck extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "duck";
        this.isMovableByPlayer = true;
        this.isCapturable = false;
        this.isNeutral = true;
        this.canMoveAnywhere = true;
    }
}