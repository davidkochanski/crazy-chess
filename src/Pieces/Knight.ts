import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "knight";
        this.canMoveAsKnight = true;
    }
}