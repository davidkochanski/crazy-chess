import { Piece } from "./Piece";

export class Knook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Knook";
        this.id = "6156f08c-d7ca-47d3-8a38-0ac1a1439d3f";
        this.image = "knook.png";
        this.colour = "#cccccc"
        this.canMoveOrthagonally = true;
        this.canMoveAsKnight = true;
        this.isCastleable = true;
        this.description = "An epic fusion of the Knight and Rook!"
    }
}