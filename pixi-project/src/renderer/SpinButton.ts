import { Container, Graphics, Sprite } from "pixi.js";

export class SpinButton extends Container {
  private bg: Graphics;
  private fg: Sprite;

  private buttonSize = 100;
  private clickHandler?: () => void;

  private handlePointerDown = () => {
    this.clickHandler?.();
  };

  constructor() {
    super();

    this.eventMode = "static";
    this.cursor = "pointer";

    this.bg = new Graphics()
      .ellipse(0, 0, this.buttonSize / 2, this.buttonSize / 2)
      .fill(0xffffff);

    this.fg = Sprite.from("spin_button");
    this.fg.width = this.buttonSize;
    this.fg.height = this.buttonSize;
    this.fg.anchor.set(0.5);

    this.bg.position.set(0, 0);
    this.fg.position.set(0, 0);

    this.addChild(this.bg);
    this.addChild(this.fg);

    this.on("pointerdown", this.handlePointerDown);

    this.setEnabled(true);
  }

  onClick(onClick: () => void) {
    this.clickHandler = onClick;
  }

  removeClick() {
    this.clickHandler = undefined;
  }

  setEnabled(enabled: boolean) {
    this.eventMode = enabled ? "static" : "none";
    this.cursor = enabled ? "pointer" : "default";

    if (enabled) {
      this.alpha = 1;
      this.bg.tint = 0x3498db;
      this.fg.tint = 0xffffff;
    } else {
      this.alpha = 0.6;
      this.bg.tint = 0x777777;
      this.fg.tint = 0xaaaaaa;
    }
  }

  destroy(options?: boolean) {
    this.off("pointerdown", this.handlePointerDown);
    super.destroy(options);
  }
}
