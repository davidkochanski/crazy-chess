import { Piece } from "./Piece";

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "queen";
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
    }
}