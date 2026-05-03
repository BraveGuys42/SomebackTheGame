import { Container, Sprite } from "pixi.js";
import { GlowFilter } from "pixi-filters";

// Visual representation of a single slot machine cell (foreground + background layers)
// Handles symbol rendering, win highlighting, and state transitions (reset/bake/glow)
export class SymbolCell extends Container {
  bg: Sprite;
  fg: Sprite;

  // shared glow filter instance applied to winning cells (avoids per-cell allocations)
  static glow = new GlowFilter({
    distance: 15,
    outerStrength: 4,
    innerStrength: 3,
    color: 0xffff00,
    quality: 0.5,
  });

  constructor(cellSize: number) {
    super();

    this.bg = new Sprite();
    this.fg = new Sprite();

    this.bg.width = this.bg.height = cellSize;
    this.fg.width = this.fg.height = cellSize;

    this.addChild(this.bg, this.fg);

    this.reset();
  }

  setSymbol(symbol: string) {
    this.bg.texture = Sprite.from(symbol + "_bg").texture;
    this.fg.texture = Sprite.from(symbol).texture;
  }

  setPosition(x: number, y: number) {
    this.position.set(x, y);
  }

  applyGlow() {
    this.bg.filters = SymbolCell.glow;
  }

  bake() {
    this.bg.filters = null;
    this.bg.tint = 0xffffff;
  }

  reset() {
    this.bg.filters = null;
    this.bg.tint = 0x777777;
    this.fg.texture = Sprite.from("").texture;
  }
}
