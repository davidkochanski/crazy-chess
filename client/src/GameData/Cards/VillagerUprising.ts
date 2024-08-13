import { CardBehaviour } from "./Card";

export class VillagerUprising extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Turn all pawns into villagers!!!";
        this.canBeUsedOnEnemyPieces = true;
        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            pieces.forEach((row, x) => {
                row.forEach((piece, y) => {
                    pieces[x][y] = piece.replace("pawn", "villager").replace("PAWN", "VILLAGER");
                })
            })
            return [pieces, tiles];
        }
    }
}