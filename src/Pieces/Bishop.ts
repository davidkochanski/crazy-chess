import { PieceBehaviour } from "./Piece";

export class Bishop extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveDiagonally = true;
    }
}