import { Piece } from "./Piece";

export class Knook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "knook";
        this.canMoveOrthagonally = true;
        this.canMoveAsKnight = true;
        this.isCastleable = true;
    }
}