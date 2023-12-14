import { CardBehaviour } from "./Cards/Card";
import { createCardBehaviour } from "./Cards/CardFactory";

// const ANYWHERE = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => [i, j])).flat();

export const getCardAction = (card: string): CardBehaviour => {
    return createCardBehaviour(card);
}