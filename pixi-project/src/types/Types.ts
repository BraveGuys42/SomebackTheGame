/**
 * Represents a slot machine symbol definition
 * - Score: payout values per match count (e.g. 3/4/5 matches)
 * - fg/bg: foreground and background textures for layered rendering
 */
export type SymbolData = {
  Symbol: string;
  Score: number[];
  fg: string;
  bg: string;
};

// Represents a single reel strip (ordered symbol IDs)
export type ReelsetData = string[];

/**
 * Defines a payline pattern using a grid mask
 * mask[row][col] === 1 indicates an active payline position
 */
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

/**
 * Data passed to UI layer after spin completes
 * used for scoreboard + result panel rendering
 */
export type RunInfo = {
  pos: number[];
  totalScore: number;
  paylines: PaylineResult[];
  scores: number[];
};
