import { Piece } from "./Piece";

export class Archbishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "archbishop";
        this.canMoveAsKnight = true;
        this.canMoveDiagonally = true;

    }
}