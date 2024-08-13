import { AtomicBomb } from "./AtomicBomb";
import { CardBehaviour } from "./Card";
import { IronWeight } from "./IronWeight";
import { Knookify } from "./Knookify";
import { PlacePortal } from "./PlacePortal";
import { PlaceWall } from "./PlaceWall";
import { VillagerUprising } from "./VillagerUprising";

export const createCardBehaviour = (card: string): CardBehaviour => {
    switch(card.toLowerCase()) {
        case "atomic-bomb": return new AtomicBomb();
        case "iron-weight": return new IronWeight();
        case "knookify": return new Knookify();
        case "place-wall": return new PlaceWall();
        case "place-portal": return new PlacePortal();
        case "villager-uprising": return new VillagerUprising();
        default: return new CardBehaviour();
    }
}