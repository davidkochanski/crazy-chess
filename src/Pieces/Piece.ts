export class PieceBehaviour {
    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, pieces: string[][]): string[][] => pieces;
    // @ts-ignore
    onCapture = (currX: number, currY: number, pieces: string[][]): string[][] => pieces;

    canMoveAsKnight: boolean = false;
    canMoveDiagonally: boolean = false;
    canMoveOrthagonally: boolean = false;
    canMoveAsKing: boolean = false;
    canMoveAsPawn: boolean = false;
    canMoveAsCamel: boolean = false;
    canMoveAnywhere: boolean = false;
    canMoveAsGold: boolean = false;
    canMoveAsRotatedKnight: boolean = false;
    isMovableByPlayer: boolean = true;
    isCastleable: boolean = false;
    isNeutral: boolean = false;
    isCapturable: boolean = true;
    canCapture: boolean = true;
    maximumRange: number = Infinity;
}