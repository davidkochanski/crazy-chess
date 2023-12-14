import { PieceBehaviour } from "./Piece";

export class RotatedRook extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveDiagonally = true;
        this.isCastleable = true;
    }
}