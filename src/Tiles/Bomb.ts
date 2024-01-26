import { Piece } from "../Pieces/Piece";
import { Tile } from "./Tile";

export class Bomb extends Tile {
    constructor() {
        super();
        this.isOccupyable = true;
        this.onMoveEnd = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]) => {
            return new Promise((resolve) => {
                if(pieces[currX][currY] !== null) {
                    pieces[currX][currY] = null;
    
                    for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                        for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                            pieces[i][j] = null;
                        }
                    }
    
                    tiles[currX][currY] = null;
                } 
    
                resolve(pieces);
            })

        }
    }
}