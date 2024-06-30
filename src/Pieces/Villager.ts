import { Piece } from "./Piece";

export class Villager extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Villager";
        this.id = 9;
        this.image = "villager.png";
        this.colour = "#C4A484";
        this.canMoveAsVillager = true;
    }
}