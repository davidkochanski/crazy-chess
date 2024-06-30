import { Piece } from "./Piece";

export class King extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "King";
        this.image = "king.png"
        this.id = 6;
        this.colour = "#BA68C8";
        
        this.canMoveAsKing = true;
        this.isRoyal = true;
    }
}