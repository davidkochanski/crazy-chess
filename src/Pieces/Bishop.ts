import { Piece } from "./Piece";

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Bishop";
        this.image = "bishop.png";
        this.colour = "#FFF176";
        this.canMoveDiagonally = true;
        this.id = 3;
    }
}