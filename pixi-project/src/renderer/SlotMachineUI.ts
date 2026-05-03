import { Container } from "pixi.js";
import { GridView } from "../types/Types";
import { SymbolCell } from "./SymbolCell";
import { ROWS, COLS } from "../config/GameConfigs";

// PixiJS visual layer for slot machine grid rendering
// Handles symbol placement, updates, and win-state highlighting
export class SlotMachineUI extends Container {
  private cells: SymbolCell[][] = [];

  cellSize;
  padding;

  rows = ROWS;
  cols = COLS;

  constructor() {
    super();

    // dynamic scaling based on viewport width (responsive grid sizing)
    this.cellSize = Math.min(120, window.innerWidth / 6);
    this.padding = this.cellSize * 0.1;

    this.buildInitGrid();
  }

  // initializes grid cells and positions them in a 2D layout
  // each cell is a reusable SymbolCell instance
  buildInitGrid() {
    this.cells = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => new SymbolCell(this.cellSize)),
    );
    this.forEachCell((cell, r, c) => {
      cell.setPosition(
        (this.cellSize + this.padding) * c,
        (this.cellSize + this.padding) * r,
      );
      this.addChild(cell);
    });
  }

  // updates a single reel column with new symbol data during spin
  updateColumn(col: number, symbols: string[]) {
    for (let i = 0; i < this.rows; i++) {
      this.cells[i][col].setSymbol(symbols[i]);
    }
  }

  // clears all visual states (glow, animations, transient effects)
  reset() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.forEachCell((cell, _rc) => {
      cell.reset();
    });
  }

  // locks column into final state after spin stops (prevents further updates)
  bakeColumn(col: number) {
    for (let i = 0; i < this.rows; i++) {
      this.cells[i][col].bake();
    }
  }

  // highlights winning cells based on evaluated payline mask
  showValidPaylines(payLineMask: number[][]) {
    this.forEachCell((cell, r, c) => {
      if (payLineMask[r][c] === 1) {
        cell.applyGlow();
      }
    });
  }

  // full grid redraw (used for initial render or forced sync)
  update(gridView: GridView) {
    this.forEachCell((cell, r, c) => {
      cell.setSymbol(gridView[r][c]);
    });
  }

  // internal helper for iterating 2D grid structure
  private forEachCell(
    callback: (cell: SymbolCell, r: number, c: number) => void,
  ) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        callback(this.cells[r][c], r, c);
      }
    }
  }
}
