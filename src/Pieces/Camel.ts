import { Piece } from "./Piece";

export class Camel extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Camel";
        this.id = 7;
        this.image = "camel.png"
        this.colour = "#fff0db";
        this.canMoveAsCamel = true;

    }
}