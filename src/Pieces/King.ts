import { PieceBehaviour } from "./Piece";

export class King extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsKing = true;
    }
}