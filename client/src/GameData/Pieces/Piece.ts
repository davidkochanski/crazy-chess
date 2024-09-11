export class Piece {

    constructor (isWhite: boolean) {
        this.isWhite = isWhite
    }

    // // @ts-ignore
    // onMoveEnd = (currX: number, currY: number, state: ChessState): Promise<ChessState> => Promise.resolve(state);
    // // @ts-ignore
    // onCapture = (currX: number, currY: number, state: ChessState): ChessState => state;
    // // @ts-ignore
    // onGetsCaptured = (currX: number, currY: number, state: ChessState): ChessState => state;
    // // @ts-ignore
    // onMove = (currX: number, currY: number, state: ChessState): ChessState => state;

    canMoveAsKnight: boolean = false;
    canMoveDiagonally: boolean = false;
    canMoveOrthogonally: boolean = false;
    canMoveAsKing: boolean = false;
    canMoveAsPawn: boolean = false;
    canMoveAsCamel: boolean = false;
    canMoveAnywhere: boolean = false;
    canMoveAsGold: boolean = false;
    canMoveAsRotatedKnight: boolean = false;
    canMoveAsVillager: boolean = false;
    isMovableByPlayer: boolean = true;
    isCastleable: boolean = false;
    isNeutral: boolean = false;
    isCapturable: boolean = true;
    isBouncy: boolean = false;
    canCapture: boolean = true;
    maximumRange: number = Infinity;
    canEnPassant: boolean = false;
    isRoyal: boolean = false;

    name: string = "unknown";
    description: string = "yep, this certainly is a piece";
    image: string = "empty.png";
    colour: string = "#008080";
    isWhite: boolean;
    attachments: string[] = [];

    pieceId: string = "default";
    
    isEmpty: boolean = false;

    // public toString = (): string => {
    //     if(this.isNeutral) return this.name;
    //     if(this.isEmpty) return "empty";
        
    //     return `${this.isWhite ? "white" : "black"}-${this.name}`
    // }

    // public equals = (other: Piece): boolean => {
    //     return this.name === other.name;
    // }
}