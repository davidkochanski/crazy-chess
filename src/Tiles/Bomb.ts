import { TileBehaviour } from "./Tile";

export class Bomb extends TileBehaviour {
    constructor() {
        super();
        this.isOccupyable = true;
        this.onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            return new Promise((resolve) => {
                if(pieces[currX][currY] !== "-") {
                    pieces[currX][currY] = "-";
    
                    for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                        for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                            pieces[i][j] = "-";
                        }
                    }
    
                    tiles[currX][currY] = "-";
                } 
    
                resolve(pieces);
            })

        }
    }
}