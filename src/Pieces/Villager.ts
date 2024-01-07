import { PieceBehaviour } from "./Piece";

export class Villager extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsVillager = true;
    }
}