import { Application, Container, Text, Assets } from "pixi.js";
import { SymbolData } from "./types/Types";

// Full-screen preloader overlay responsible for asset loading and progress display
// Uses Pixi Assets bundle system to load game resources before scene start
export class Preloader extends Container {
  private loadingText: Text;

  // Centered loading text overlay attached directly to Pixi stage
  constructor(private app: Application) {
    super();

    this.loadingText = new Text({
      text: "Loading 0%",
      style: {
        fill: "#ffffff",
        fontSize: 32,
        fontFamily: "Arial",
      },
    });

    this.loadingText.anchor.set(0.5);
    this.centerText();

    this.addChild(this.loadingText);
    app.stage.addChild(this);
  }

  private centerText() {
    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2;
  }

  // Builds Pixi asset manifest dynamically from symbol config
  // Each symbol generates both foreground and background assets
  // Loads all assets as a single bundle with progress callback
  async loadAssets(symbols: SymbolData[]) {
    const manifest = {
      bundles: [
        {
          name: "main",
          assets: [
            ...symbols.flatMap((item) => [
              {
                alias: item.Symbol,
                src: item.fg,
              },
              {
                alias: item.Symbol + "_bg",
                src: item.bg,
              },
            ]),
            {
              alias: "spin_button",
              src: "./assets/spin_button.png",
            },
          ],
        },
      ],
    };

    // Initialize assets system
    Assets.init({ manifest });

    // Load bundle with progress
    await Assets.loadBundle("main", (progress) => {
      const percent = Math.floor(progress * 100);
      this.loadingText.text = `Loading ${percent}%`;
      this.centerText();
    });
  }

  async loadJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    return res.json();
  }
}
