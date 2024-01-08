import { getTileBehaviour } from "../TileBehaviours";
import { TileBehaviour } from "./Tile";

export class PressurePlate extends TileBehaviour {
    constructor() {
        super();
        this.onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            return new Promise((resolve) => {
                const arrow = document.createElement("img");
                arrow.classList.add("anim")
                arrow.src = "img/arrow.png";

                const tileWidth = document.getElementById("tile-0-0")?.clientWidth;
                let count = 1;
                let deletingPiece = [-1, -1];

                tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile === "bow") {
                            let [xx, yy] = [x + 1, y];
                            const el = document.getElementById(`tile-${x}-${y}`);
                            el?.appendChild(arrow);

                            while (xx < 7) {
                                if (getTileBehaviour(tiles[xx][yy]).isBlocking) break;

                                if (pieces[xx][yy] !== "-") {
                                    deletingPiece = [xx, yy];
                                    break;
                                }

                                count++;
                                xx++;
                            }


                            if (tileWidth) {
                                const theAnimation = arrow.animate([{ left: 0 }, { left: count * tileWidth + "px" }], { duration: 25 * count, fill: "forwards" });

                                theAnimation.onfinish = () => {
                                    if(JSON.stringify(deletingPiece) !== "[-1,-1]") pieces[deletingPiece[0]][deletingPiece[1]] = "-";
                                    
                                    arrow.remove();
                                    resolve(pieces);

                                }
                            }
                        }
                    });
                });

                if (JSON.stringify(deletingPiece) === "[-1,-1]") {
                    resolve(pieces);
                }
            });
        };
    }
}
