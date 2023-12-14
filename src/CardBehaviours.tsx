import { isWhite } from "./Moves";

export type CardAction = {
    onUse: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => [string[][], string[][]];
    desciption: string;
    usedAutomatically: boolean;
    canBeUsedOnFriendlyPieces: boolean;
    canBeUsedOnEnemyPieces: boolean;
    canBeUsedOnEmptySquares: boolean;
    canBeUsedOnNeutralPieces: boolean;
    usableOn: string[];
    unusableOn: string[];
    areaOfUsage: number[][];
}

const ANYWHERE = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => [i, j])).flat();

export const getCardAction = (card: string): CardAction => {
    card = card.toLowerCase();

    let options: CardAction = {
        // @ts-ignore
        onUse: (activeX: number, activeY: number, pieces: string[][], tiles: string[][]) => pieces,
        desciption: "null",
        usedAutomatically: false,
        canBeUsedOnFriendlyPieces: false,
        canBeUsedOnEnemyPieces: false,
        canBeUsedOnEmptySquares: false,
        canBeUsedOnNeutralPieces: false,
        usableOn: [],
        unusableOn: [],
        areaOfUsage: [],
    }

    switch (card) {
        case "atomic-bomb":
            options.desciption = "Explode a 3x3 area.";
            options.canBeUsedOnEmptySquares = true;
            options.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                pieces[currX][currY] = "-";

                for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                    for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                        pieces[i][j] = "-";
                    }
                }
                return [pieces, tiles];
            }
            break;
        case "place-wall":
            options.desciption = "Place a brick wall.";
            options.canBeUsedOnEmptySquares = true;
            options.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                tiles[currX][currY] = "wall";
                return [pieces, tiles];
            }
            break;
        case "iron-weight":
            options.desciption = "Reduce any enemy piece's movement.";
            options.canBeUsedOnEnemyPieces = true;
            options.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                let piece = pieces[currX][currY];

                piece = "slow-" + piece;

                pieces[currX][currY] = piece;

                return [pieces, tiles];
            }
            break;
        case "knookify":
            options.desciption = "Replace one of your rooks with a knook.";
            options.usableOn = ["rook"];
            options.canBeUsedOnFriendlyPieces = true;
            options.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                pieces[currX][currY] = isWhite(pieces[currX][currY]) ? "KNOOK" : "knook";

                return [pieces, tiles];
            }

    }

    return options;
}