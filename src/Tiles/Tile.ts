export class TileBehaviour {
    // @ts-ignore
    onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]): Promise<string[][]> => {
        return Promise.resolve(pieces);
    };
    
    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]): Promise<string[][]> => {
        return Promise.resolve(pieces);
    };

    isBlocking = false;
    isOccupyable = true;
}
