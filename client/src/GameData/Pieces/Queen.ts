import { Piece } from "./Piece";

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Queen";
        this.colour = "#64B5F6";
        this.image = "queen.png"
        this.id = "6457bc22-3b72-4596-b0f4-3c687d85cf53";
        this.description = "The Queen can move in any straight direction!"
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
    }
}