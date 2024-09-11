import { Piece } from "./Piece";

export class Camel extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Camel";
        this.id = "0b4d8973-f2cc-4101-8c69-922e3b994441";
        this.image = "camel.png"
        this.colour = "#fff0db";
        this.canMoveAsCamel = true;
        this.description = "The Knight's older cousin, moves in a longer L."

    }
}