import { produce } from "immer";
import ChessState from "../scripts/ChessState";
import { getCoords } from "../scripts/Moves";
import { EmptyPiece } from "./EmptyPiece";
import { Piece } from "./Piece";
import { Villager } from "./Villager";

export class Fox extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "fox";
        this.isMovableByPlayer = false;
        this.isNeutral = true;
        this.isCapturable = true;
        this.onMoveEnd = (currX: number, currY: number, state: ChessState) => {
            return new Promise((resolve) => {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 8);

                const prevFox = document.querySelector(`#tile-${currX}-${currY} > .piece-img`) as HTMLImageElement;
                prevFox.src = "img/empty.png";

                const tile = document.getElementById("tile-0-0");
                const foxPos = document.querySelector(`#tile-${currX}-${currY}`);



                const fox = document.createElement("img");
                fox.src = "img/fox.png";
                fox.classList.add("anim");

                foxPos?.appendChild(fox);

                const width = tile?.clientWidth;

                const deltaX = x - currX;
                const deltaY = y - currY;


                if(width && fox) {
                    const animation = fox.animate([{
                        translate: `${width * deltaX}px ${-width *deltaY}px`
                    }], {duration: 0.5 * Math.sqrt(Math.pow((width * deltaX), 2) + Math.pow((width * deltaY), 2)),
                        fill: "forwards"})


                    animation.onfinish = () => {
                        const newState = produce(state, draftState => {
                            fox.remove();

                            draftState.pieces[currX][currY] = new EmptyPiece();
                            draftState.pieces[x][y] = new Fox(true);
        
                            draftState.log.push(
                                {
                                    content: `The fox jumps to ${getCoords(x, y)}!`,
                                    byWhite: state.whiteToPlay,
                                    author: "CONSOLE",
                                }
                            );
                        })
                        resolve(newState);
                        return;
                    };
                }
            })
        }
    }
}