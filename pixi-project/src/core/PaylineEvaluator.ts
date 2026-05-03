import { GridView, PaylineData, PaylineResult, EvaluationResult } from "../types/Types";

export class PaylineEvaluator {

    private paylines: PaylineData[];
    private scoreMap: Map<string, number[]>;

    constructor(paylines: PaylineData[], symbols: any[]) {
        this.paylines = paylines;
        this.scoreMap = this.#buildScoreMap(symbols);
    }

    evaluate(grid: GridView): EvaluationResult {
        const paylines: PaylineResult[] = [];

        for (const payline of this.paylines) {
            const { id, mask } = payline;

            const matchedSymbols: string[] = [];
            const positions: { row: number, col: number }[] = [];

            // extract symbols along mask
            for (let col = 0; col < grid[0].length; col++) {
                for (let row = 0; row < grid.length; row++) {
                    if (mask[row][col] === 1) {
                        matchedSymbols.push(grid[row][col]);
                        positions.push({ row, col });
                        break;
                    }
                }
            }

            const first = matchedSymbols[0];
            if (!first) continue;

            let count = 1;

            for (let i = 1; i < matchedSymbols.length; i++) {
                if (matchedSymbols[i] === first) count++;
                else break;
            }

            if (count >= 3) {
                paylines.push({
                    id,
                    symbol: first,
                    count,
                    positions: positions.slice(0, count)
                });
            }
        }



        // compute scores
        const scores: number[] = [];

        for (const p of paylines) {
            const table = this.scoreMap.get(p.symbol);
            if (!table) continue;

            const score = table[p.count - 3];
            if (score !== undefined) {
                scores.push(score);
            }
        }

        const totalScore = scores.reduce((a, b) => a + b, 0);

        // build win grid
        const winGridMask = this.#buildWinGrid(paylines, grid.length, grid[0].length);

        return {
            paylines,
            winGridMask,
            scores,
            totalScore
        };
    }

    #buildWinGrid(paylines: PaylineResult[], rows: number, cols: number): number[][] 
    {

        const grid: number[][] = Array.from({ length: rows }, () =>
            Array(cols).fill(0)
        );

        for (const p of paylines) {
            for (const pos of p.positions) {
                grid[pos.row][pos.col] = 1;
            }
        }

        return grid;
    }

    #buildScoreMap(data: any[]): Map<string, number[]> {
        return new Map(
            data.map(item => [item.Symbol, item.Score])
        );
    }
}