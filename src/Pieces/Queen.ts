import { Piece } from "./Piece";

export class Queen extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Queen";
        this.colour = "#64B5F6";
        this.image = "queen.png"
        this.id = 5;
        
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
    }
}