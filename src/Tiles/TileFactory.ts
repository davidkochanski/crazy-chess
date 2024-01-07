import { BluePortal } from "./BluePortal";
import { Bomb } from "./Bomb";
import { Bow } from "./Bow";
import { OrangePortal } from "./OrangePortal";
import { PressurePlate } from "./PressurePlate";
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
        case "bow": return new Bow();
        case "pressure-plate": return new PressurePlate();
        default: return new TileBehaviour();
    }
}