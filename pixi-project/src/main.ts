import { Application } from "pixi.js";
import { Preloader } from "./Preloader";
import { SlotMachine } from "./core/SlotMachine";
import { PaylineEvaluator } from "./core/PaylineEvaluator";
import { GameController } from "./GameController";
import { GameScene } from "./renderer/GameScene";
import { ASSET_CONFIG } from "./config/GameConfigs";
import { AssetLoader } from "./AssetLoader";
import { defaultRNG } from "./core/RNG";

(async () => {
  try {

    // APP INIT
    const app = new Application();
    await app.init({background: "#301c03",resizeTo: window,});

    const container = document.getElementById("pixi-container");
    if (!container) {
        throw new Error("Missing #pixi-container");
    }
    container.appendChild(app.canvas);

    
    // PRELOADER STAGE
    const assetLoader = new AssetLoader(ASSET_CONFIG);
    const { symbols, reels, paylines } = await assetLoader.loadAll();

    const preloader = new Preloader(app);
    app.stage.addChild(preloader);


    await preloader.loadAssets(symbols);
    app.stage.removeChild(preloader);
    preloader.destroy();

    // ENGINE (BACKEND)
    const slotMachine = new SlotMachine(reels, defaultRNG);
    const paylineEval = new PaylineEvaluator(paylines, symbols);

    // VIEW (FRONTEND)
    const gameScene = new GameScene(app);
    app.stage.addChild(gameScene);

    // CONTROLLER
    const controller = new GameController(slotMachine, paylineEval,gameScene);
    controller.connect();
  } 
  catch (err) {
    console.error("Fatal startup error", err);
    return;
  }
})();
