import { Piece } from "./Piece";

export class King extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "king";
        this.canMoveAsKing = true;
    }
}