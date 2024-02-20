import { produce } from "immer";
import ChessState from "../ChessState";
import { getCoords } from "../Moves";
import { EmptyPiece } from "./EmptyPiece";
import { Piece } from "./Piece";

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

                const tile = document.getElementById("tile-0-0");
                const fox = document.querySelector(`#tile-${currX}-${currY} > .piece-img`);

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