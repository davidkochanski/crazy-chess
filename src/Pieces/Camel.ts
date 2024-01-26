import { Piece } from "./Piece";

export class Camel extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "camel";
        this.canMoveAsCamel = true;

    }
}