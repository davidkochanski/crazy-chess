import { Piece } from "./Piece";

export class Villager extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "villager";
        this.canMoveAsVillager = true;
    }
}