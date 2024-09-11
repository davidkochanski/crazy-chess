import { Piece } from "./Piece";

export class King extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "King";
        this.image = "king.png"
        this.id = "3376620c-a4be-467e-8111-e27f7de562a5";
        this.colour = "#BA68C8";
        
        this.canMoveAsKing = true;
        this.isRoyal = true;
    }
}