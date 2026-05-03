export type SymbolData = {
    "Symbol" : string,
    "Score" : number[],
    "fg" : string,
    "bg" : string
}

export type ReelsetData = string[];

export type PaylineData = {
    id : number,
    mask : GridView
}


export type PaylineResult = {
    id : number,
    symbol : string,
    count : number
    positions : { row: number, col: number }[]
}

export type GridView = any[][]

export type EvaluationResult = {
    paylines: PaylineResult[];
    winGridMask: GridView;
    scores: number[];
    totalScore: number;
};

export type RunInfo = {
    pos : number[]
    totalScore: number;
    paylines: PaylineResult[];
    scores : number[]
};
