import { getTileBehaviour } from "../TileBehaviours";
import { TileBehaviour } from "./Tile";

export class PressurePlate extends TileBehaviour {
    constructor() {
        super();
        this.onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {

            tiles.forEach((row, x) => {
                row.forEach((tile, y) => {
                    if (tile === "bow") {
                        let [xx, yy] = [x + 1, y];


                        while(xx < 7) {

                            if(getTileBehaviour(tiles[xx][yy]).isBlocking) break;

                            if(pieces[xx][yy] !== "-") {
                                pieces[xx][yy] = "-";
                                break;
                            }

                            xx++;
                        }
                    }
                });
            });

            return pieces;
        };
    }
}