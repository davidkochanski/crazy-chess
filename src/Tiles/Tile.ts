export class TileBehaviour {
    // @ts-ignore
    onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => pieces;
    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => pieces;
    isBlocking = false;
    isOccupyable = true;
}