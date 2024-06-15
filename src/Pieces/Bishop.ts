import { Piece } from "./Piece";

export class Bishop extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "bishop";
        this.colour = "#FFF176";
        this.canMoveDiagonally = true;
    }
}