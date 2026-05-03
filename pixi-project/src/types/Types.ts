export type SymbolData = {
  Symbol: string;
  Score: number[];
  fg: string;
  bg: string;
};

export type ReelsetData = string[];

export type PaylineData = {
  id: number;
  mask: number[][];
};

export type PaylineResult = {
  id: number;
  symbol: string;
  count: number;
  positions: { row: number; col: number }[];
};

export type GridView = string[][];

export type EvaluationResult = {
  paylines: PaylineResult[];
  winGridMask: number[][];
  scores: number[];
  totalScore: number;
};

export type RunInfo = {
  pos: number[];
  totalScore: number;
  paylines: PaylineResult[];
  scores: number[];
};
