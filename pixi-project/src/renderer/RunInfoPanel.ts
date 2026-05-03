import { Container, Graphics, Text } from "pixi.js";
import { RunInfo } from "../types/Types";

export class RunInfoPanel extends Container {
  #bg: Graphics;
  #text: Text;

  widthBox = 300;
  heightBox = 200;

  constructor() {
    super();

    // background panel
    this.#bg = new Graphics()
      .roundRect(0, 0, this.widthBox, this.heightBox, 12)
      .fill(0x000000);

    this.#bg.alpha = 0.7;

    // text
    this.#text = new Text({
      text: "",
      style: {
        fill: "#ffffff",
        fontSize: 16,
        wordWrap: true,
        wordWrapWidth: this.widthBox - 20,
        fontFamily: "Arial",
      },
    });

    this.#text.x = 10;
    this.#text.y = 10;

    this.addChild(this.#bg);
    this.addChild(this.#text);
  }

  setData(info: RunInfo) {
    this.visible = true;

    const lines: string[] = [];

    // Positions
    lines.push(`Positions: ${info.pos.join(", ")}`);
    lines.push(`Total wins: ${info.totalScore}`);
    lines.push("");

    // Paylines
    for (const p of info.paylines) {
      const scoreIndex = info.paylines.indexOf(p);
      const score = info.scores?.[scoreIndex] ?? 0;

      lines.push(`- payline ${p.id}, ${p.symbol} x${p.count}, ${score}`);
    }

    this.#text.text = lines.join("\n");
  }

  clear() {
    this.visible = false;
    this.#text.text = "";
  }
}
