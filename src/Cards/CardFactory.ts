import { AtomicBomb } from "./AtomicBomb";
import { CardBehaviour } from "./Card";
import { IronWeight } from "./IronWeight";
import { Knookify } from "./Knookify";
import { PlaceWall } from "./PlaceWall";

export const createCardBehaviour = (card: string): CardBehaviour => {
    switch(card.toLowerCase()) {
        case "atomic-bomb": return new AtomicBomb();
        case "iron-weight": return new IronWeight();
        case "knookify": return new Knookify();
        case "place-wall": return new PlaceWall();
        default: return new CardBehaviour();
    }
}