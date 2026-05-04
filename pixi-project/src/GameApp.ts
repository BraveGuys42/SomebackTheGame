import { Application } from "pixi.js";
import { PaylineData, ReelsetData, SymbolData } from "./types/Types";
import { SlotMachine } from "./core/SlotMachine";
import { GameScene } from "./renderer/GameScene";
import { PaylineEvaluator } from "./core/PaylineEvaluator";
import { GameController } from "./GameController";
import { defaultRNG } from "./core/RNG";

export class GameApp {
  private controller!: GameController;

  private readonly slotMachine: SlotMachine;
  private readonly paylineEval: PaylineEvaluator;
  private readonly gameScene: GameScene;

  constructor(
    app: Application,
    reels: ReelsetData[],
    paylines: PaylineData[],
    symbols: SymbolData[],
  ) {
    this.slotMachine = new SlotMachine(reels, defaultRNG);
    this.paylineEval = new PaylineEvaluator(paylines, symbols);
    this.gameScene = new GameScene(app);

    app.stage.addChild(this.gameScene);
  }

  public run() {
    this.controller = new GameController(
      this.slotMachine,
      this.paylineEval,
      this.gameScene,
    );
    this.controller.connect();
  }
}
