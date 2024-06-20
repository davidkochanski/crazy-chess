import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "knight";
        this.colour = "#FFB74D";
        this.canMoveAsKnight = true;
        this.id = 2;
    }
}