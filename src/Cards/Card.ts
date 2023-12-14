export class CardBehaviour {
    // @ts-ignore
    onUse = (activeX: number, activeY: number, pieces: string[][], tiles: string[][]) => [pieces, tiles];
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