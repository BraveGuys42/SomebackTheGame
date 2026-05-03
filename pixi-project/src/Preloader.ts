import { Application, Container, Text, Assets } from "pixi.js";
import { SymbolData } from "./types/Types";

export class Preloader extends Container {
  private loadingText: Text;

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

  async loadAssets(symbols: SymbolData[]) {
    // Build manifest properly
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
