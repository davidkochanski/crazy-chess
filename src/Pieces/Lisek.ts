import { Piece } from "./Piece";

export class Lisek extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "lisek";

    }
}