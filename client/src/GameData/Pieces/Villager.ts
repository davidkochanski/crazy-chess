import { Piece } from "./Piece";

export class Villager extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Villager";
        this.id = "ec2db094-6d15-4096-b454-6f808e8b3f70";
        this.image = "villager.png";
        this.colour = "#C4A484";
        this.canMoveAsVillager = true;
        this.description = "The villager can only move one pitiful square forwards. Why not fix that?"
    }
}