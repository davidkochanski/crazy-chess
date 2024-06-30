import { Piece } from "./Piece";

export class Knight extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Knight";
        this.image = "knight.png"
        this.colour = "#FFB74D";
        this.canMoveAsKnight = true;
        this.id = 2;
    }
}