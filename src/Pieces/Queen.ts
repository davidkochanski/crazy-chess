import { Piece } from "./Piece";

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "queen";
        this.colour = "#64B5F6";
        this.id = 5;
        
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
    }
}