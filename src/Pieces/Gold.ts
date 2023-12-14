import { PieceBehaviour } from "./Piece";

export class Gold extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsGold = true;
    }
}