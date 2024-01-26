import { Tile } from "./Tile";

export class Trap extends Tile {
    constructor() {
        super();
        this.isBlocking = true;
        this.isOccupyable = true;
        
        this.onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            return new Promise((resolve) => {
                if(pieces[currX][currY] !== "-") {
                    pieces[currX][currY] = "-";
                    tiles[currX][currY] = "-";
                } 
    
                resolve(pieces);
            })

        }
    }
}