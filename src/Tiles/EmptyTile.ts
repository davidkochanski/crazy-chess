import { Tile } from "./Tile";

export class EmptyTile extends Tile {
    isEmpty = (): boolean => {
        return true;
    }
}