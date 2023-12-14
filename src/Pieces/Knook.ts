import { PieceBehaviour } from "./Piece";

export class Knook extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveOrthagonally = true;
        this.canMoveAsKnight = true;
        this.isCastleable = true;
    }
}