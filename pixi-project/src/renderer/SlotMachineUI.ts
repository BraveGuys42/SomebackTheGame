import { Container } from "pixi.js";
import { GridView } from "../types/Types";
import { SymbolCell } from "./SymbolCell";
import { ROWS, COLS } from "../config/GameConfigs";

export class SlotMachineUI extends Container {
  private cells: SymbolCell[][] = [];

  cellSize = 100;
  padding = 10;

  rows = ROWS;
  cols = COLS;

  constructor() {
    super();
    this.buildInitGrid();
  }

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

  updateColumn(col: number, symbols: string[]) {
    for (let i = 0; i < this.rows; i++) {
      this.cells[i][col].setSymbol(symbols[i]);
    }
  }

  reset() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.forEachCell((cell, _rc) => {
      cell.reset();
    });
  }

  bakeColumn(col: number) {
    for (let i = 0; i < this.rows; i++) {
      this.cells[i][col].bake();
    }
  }

  showValidPaylines(payLineMask: number[][]) {
    this.forEachCell((cell, r, c) => {
      if (payLineMask[r][c] === 1) {
        cell.applyGlow();
      }
    });
  }

  update(gridView: GridView) {
    this.forEachCell((cell, r, c) => {
      cell.setSymbol(gridView[r][c]);
    });
  }

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
