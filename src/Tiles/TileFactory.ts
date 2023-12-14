import { BluePortal } from "./BluePortal";
import { Bomb } from "./Bomb";
import { OrangePortal } from "./OrangePortal";
import { TileBehaviour } from "./Tile";
import { Trap } from "./Trap";
import { Wall } from "./Wall";

export const createTileBehaviour = (tile: string): TileBehaviour => {
    switch(tile.toLowerCase()) {
        case "blue-portal": return new BluePortal();
        case "orange-portal": return new OrangePortal();
        case "bomb": return new Bomb();
        case "trap": return new Trap();
        case "wall": return new Wall();
        default: return new TileBehaviour();
    }
}