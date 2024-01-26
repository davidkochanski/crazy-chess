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

    name = "unknown";

    public isEmpty = (): boolean => {
        return false;
    }

    public toString = (): string => {
        return this.isEmpty() ? "empty" : this.name;
    }

    public equals = (other: Tile): boolean => {
        return this.name === other.name;
    }
}
