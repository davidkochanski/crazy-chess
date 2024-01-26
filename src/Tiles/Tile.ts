export class Tile {
    // @ts-ignore
    onPieceLandHere = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]): Promise<(Piece)[][]> => {
        return Promise.resolve(pieces);
    };
    
    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]): Promise<(Piece)[][]> => {
        return Promise.resolve(pieces);
    };

    isBlocking = false;
    isOccupyable = true;

    name = "empty";

    isEmpty: boolean = false;

    public toString = (): string => {
        return this.name;
    }

    public equals = (other: Tile): boolean => {
        return this.name === other.name;
    }
}
