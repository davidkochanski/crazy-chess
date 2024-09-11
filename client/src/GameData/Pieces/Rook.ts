import { Piece } from "./Piece";

export class Rook extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Rook";
        this.image = "rook.png";
        this.colour = "#81C784"
        this.id = "5c3a0191-afbb-418e-bb34-7f2445bb4090";
        this.description = "This castle can slide in straight lines."
        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}