import ChessState from "../ChessState";
import { Tile } from "../Tiles/Tile";

export class CardBehaviour {
    // @ts-ignore
    onUse = (activeX: number, activeY: number, state: ChessState): ChessState => state;
    desciption: string = "Unimplemented Description!";
    usedAutomatically: boolean = false;
    canBeUsedOnFriendlyPieces: boolean = false;
    canBeUsedOnEnemyPieces: boolean = false;
    canBeUsedOnEmptySquares: boolean = false;
    canBeUsedOnNeutralPieces: boolean = false;
    usableOn: string[] = [];
    unusableOn: string[] = [];
    areaOfUsage: number[][] = [];
}