## Description
A lightweight slot machine game built with PixiJS and TypeScript.
It features animated reels, spin mechanics, and basic payline evaluation logic.

This project was created to demonstrate skills in game rendering, UI layout, and interactive animation using modern web technologies.

## Usage
```
cd pixi-project
npm install
npm run dev
```

## Customize Game Data
You can edit the reelsets, paylines and symbols in public/SlotMachineData/
example: appending to Paylines.json
```json
{
  "id": 8,
  "mask": [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,1]
  ]
}
```

You can also edit runtime configurations in  `src\config\GameConfigs.ts`
Faster animation speed
```
export const SPIN_CONFIG = {
    columnStopTimes: [10,20,30,40,50]
}
```
Using custom files for testing and debugging, I recommend using `reels: "SlotMachineData/Cheatset.json"` for testing payline validations

```
export const ASSET_CONFIG = {
    symbols: "SlotMachineData/RichSymbols.json",
    reels: "SlotMachineData/Cheatset.json",
    paylines: "SlotMachineData/CustomPaylines.json",
} as const;
```

## Assumptions and Limitations
- Fixed grid size: **3×5** (rows × columns)
- Paylines are evaluated as **single-path masks**, selecting one symbol per column
- Matching is **left-aligned and consecutive only**
- Asset pipeline assumes all textures and JSONs are preloaded and valid
- No runtime validation of external JSON data
  
## Project Structure
```
├───public
│   ├───assets
│   │   ├───SymbolBG
│   │   └───SymbolFG
│   └───SlotMachineData
│           Cheatset.json
│           Paylines.json
│           Reelset.json
│           Symbols.json
└───src
    │   AssetLoader.ts
    │   GameController.ts
    │   main.ts
    │   Preloader.ts
    ├───config
    │       GameConfigs.ts
    ├───core
    │       PaylineEvaluator.ts
    │       RNG.ts
    │       SlotMachine.ts
    ├───renderer
    │       GameScene.ts
    │       RunInfoPanel.ts
    │       SlotMachineUI.ts
    │       SpinButton.ts
    │       SymbolCell.ts
    └───types
            Types.ts
```
