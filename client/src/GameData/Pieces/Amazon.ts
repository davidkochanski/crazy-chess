import { Piece } from "./Piece";

export class Amazon extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "amazon";
        this.canMoveDiagonally = true;
        this.canMoveOrthogonally = true;
        this.canMoveAsKnight = true;
    }
}