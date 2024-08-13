import { Piece } from "./Piece";

export class Knook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Knook";
        this.id = 8;
        this.image = "knook.png";
        this.colour = "#cccccc"
        this.canMoveOrthagonally = true;
        this.canMoveAsKnight = true;
        this.isCastleable = true;
        this.description = "An epic fusion of the Knight and Rook!"
    }
}