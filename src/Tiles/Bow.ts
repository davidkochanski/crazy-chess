import { produce } from "immer";
import ChessState from "../ChessState";
import { EmptyPiece } from "../Pieces/EmptyPiece";
import { Tile } from "./Tile";

export class Bow extends Tile {
    constructor() {
        super();
        this.name = "bow";
        this.isBlocking = true;
        this.isOccupyable = false;
    }

    fireEvent = (currX: number, currY: number, state: ChessState): Promise<number[]> => {
        return new Promise((resolve) => {
            let x = currX;
            let y = currY;

            const arrow = document.createElement("img");
            arrow.classList.add("anim")
            arrow.src = "img/arrow.png";

            const tileWidth = document.getElementById("tile-0-0")?.clientWidth;
            let count = 1;
            let deletingPiece = [-1, -1];

            let [xx, yy] = [x + 1, y];
            const el = document.getElementById(`tile-${x}-${y}`);
            el?.appendChild(arrow);

            while (xx < 7) {
                if (state.tiles[xx][yy]?.isBlocking) break;

                if (!(state.pieces[xx][yy] instanceof EmptyPiece)) {
                    deletingPiece = [xx, yy];
                    break;
                }

                count++;
                xx++;
            }


            if (tileWidth) {
                const theAnimation = arrow.animate([{ left: 0 }, { left: count * tileWidth + "px" }], { duration: 25 * count, fill: "forwards" });

                theAnimation.onfinish = () => {
                    arrow.remove();

                    resolve(deletingPiece);
                }
            }
        }
    )}
}