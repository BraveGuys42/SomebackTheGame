import { GridView, ReelsetData } from "../types/Types";
import { RNG } from "./RNG";
import { ROWS, COLS } from "../config/GameConfigs";

export class SlotMachine {
  private reels: ReelsetData[];
  private rng: RNG;

  rows = ROWS;
  cols = COLS;

  constructor(reels: ReelsetData[], rng: RNG) {
    this.reels = reels;
    this.rng = rng;
  }

  private getRandomPos(): number[] {
    const pos: number[] = [];

    for (let i = 0; i < this.cols; i++) {
      const reelLength = this.reels[i].length;
      const idx = Math.floor(this.rng() * reelLength);
      pos.push(idx);
    }

    return pos;
  }

  private getGridView(pos: number[]): GridView {
    const gridView: GridView = [];

    for (let row = 0; row < this.rows; row++) {
      const currentRow: string[] = [];

      for (let col = 0; col < this.cols; col++) {
        const reel = this.reels[col];
        const index = (pos[col] + row) % reel.length;
        currentRow.push(reel[index]);
      }

      gridView.push(currentRow);
    }

    return gridView;
  }

  spin() {
    const pos = this.getRandomPos();
    const gridView = this.getGridView(pos);
    return { pos, gridView };
  }
}
