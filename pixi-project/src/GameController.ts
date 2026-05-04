import { SPIN_CONFIG } from "./config/GameConfigs";
import { PaylineEvaluator } from "./core/PaylineEvaluator";
import { GameScene } from "./renderer/GameScene";
import { SlotMachine } from "./core/SlotMachine";
import { GridView } from "./types/Types";

export class GameController {
  private isSpinning = false;

  private spinStartTime = 0;
  private finalSpin!: { gridView: GridView; pos: number[] };

  private stoppedColumns = new Set<number>();
  private bakedColumns = new Set<number>();

  private columnStopTimes = SPIN_CONFIG.columnStopTimes;

  constructor(
    private slotMachine: SlotMachine,
    private paylineEval: PaylineEvaluator,
    private gameScene: GameScene,
  ) {}

  connect() {
    this.gameScene.spinButton.onClick(this.spin.bind(this));
    window.addEventListener("keydown", this.onKeyDown);
  }

  disconnect() {
    this.gameScene.spinButton.removeClick();
    window.removeEventListener("keydown", this.onKeyDown);
  }

  spin() {
    //The final results are generated here,the the spinner is also initiated here
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.spinStartTime = performance.now();

    this.stoppedColumns.clear();
    this.bakedColumns.clear();

    this.gameScene.spinButton.setEnabled(false);
    this.gameScene.slotMachineUI.reset();

    this.finalSpin = this.slotMachine.spin();

    this.gameScene.app.ticker.add(this.updateSpin, this);
  }

  private updateSpin = () => {
    // elapsed time drives column stop progression (deterministic animation timing)
    const elapsed = performance.now() - this.spinStartTime;

    const lastStop = this.columnStopTimes[this.columnStopTimes.length - 1];

    // update stopped columns
    for (let i = 0; i < this.columnStopTimes.length; i++) {
      if (elapsed > this.columnStopTimes[i]) {
        this.stoppedColumns.add(i);
      }
    }

    //random spins are generated for the animations
    //this has no influence on actual spin results
    const visualSpin = this.slotMachine.spin();

    for (let col = 0; col < 5; col++) {
      if (this.stoppedColumns.has(col)) {
        const column = this.getColumn(this.finalSpin.gridView, col);
        this.gameScene.slotMachineUI.updateColumn(col, column);

        if (!this.bakedColumns.has(col)) {
          //stop animating the columns after few seconds
          //Animation time found in config/GameConfig.ts
          this.gameScene.slotMachineUI.bakeColumn(col);
          this.bakedColumns.add(col);
        }
      } else {
        const column = this.getColumn(visualSpin.gridView, col);
        this.gameScene.slotMachineUI.updateColumn(col, column);
      }
    }

    if (elapsed > lastStop) {
      this.endSpin();
    }
  };

  private endSpin() {
    //the reels should show the final view, valid paylines are shown
    this.gameScene.app.ticker.remove(this.updateSpin, this);

    const results = this.paylineEval.evaluate(this.finalSpin.gridView);

    this.gameScene.slotMachineUI.showValidPaylines(results.winGridMask);

    this.gameScene.runInfoPanel.setData({
      pos: this.finalSpin.pos,
      totalScore: results.totalScore,
      paylines: results.paylines,
      scores: results.scores,
    });

    this.isSpinning = false;
    this.gameScene.spinButton.setEnabled(true);
  }

  //Helper function for animation
  private getColumn(grid: string[][], col: number): string[] {
    return grid.map((row) => row[col]);
  }

  //Helper function for keyboard input
  private onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault(); // stops page scroll
      this.spin();
    }
  };
}
