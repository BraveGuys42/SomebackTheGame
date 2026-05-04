import { Application } from "pixi.js";
import { Preloader } from "./Preloader";
import { ASSET_CONFIG } from "./config/GameConfigs";
import { AssetLoader } from "./AssetLoader";
import { GameApp } from "./GameApp";

(async () => {
  try {
    // APP INIT
    const app = new Application();
    await app.init({ background: "#301c03", resizeTo: window });

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

    // RUN MAIN GAME
    const game = new GameApp(app, reels, paylines, symbols);
    game.run();
  } catch (err) {
    console.error("Fatal startup error", err);
    return;
  }
})();
