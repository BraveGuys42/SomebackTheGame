import { Application, Container } from "pixi.js";
import { SlotMachineUI } from "./SlotMachineUI";
import { SpinButton } from "./SpinButton";
import { RunInfoPanel } from "./RunInfoPanel";

export class GameScene extends Container {
  public readonly spinButton = new SpinButton();
  public readonly slotMachineUI = new SlotMachineUI();
  public readonly runInfoPanel = new RunInfoPanel();

  constructor(public app: Application) {
    super();

    this.addChild(this.slotMachineUI);
    this.addChild(this.spinButton);
    this.addChild(this.runInfoPanel);

    this.layout();
    window.addEventListener("resize", this.onResize);
  }

  private onResize = () => {
    //proper layout on maximize
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    this.layout();
  };

  destroy(options?: boolean) {
    window.removeEventListener("resize", this.onResize);
    super.destroy(options);
  }

  //On resizing and maximizing, make sure that the elements are centralized
  layout() {
    const gap = 10;

    const screenW = this.app.screen.width;
    const screenH = this.app.screen.height;

    const slotW = this.slotMachineUI.width;
    const slotH = this.slotMachineUI.height;

    // const spinW = this.spinButton.width;
    const spinH = this.spinButton.height;

    const infoW = this.runInfoPanel.widthBox;
    const infoH = this.runInfoPanel.heightBox;

    const totalHeight = slotH + spinH + infoH + gap * 2;

    let currentY = (screenH - totalHeight) / 2;

    // Slot machine (top)
    this.slotMachineUI.position.set((screenW - slotW) / 2, currentY);

    currentY += slotH + gap;

    // Spin button (center pivot)
    this.spinButton.position.set(screenW / 2, currentY + spinH / 2);

    currentY += spinH + gap;

    // Info panel (bottom)
    this.runInfoPanel.position.set((screenW - infoW) / 2, currentY);
  }
}
