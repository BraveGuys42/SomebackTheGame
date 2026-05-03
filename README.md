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
...
{
  "id": 8,
  "mask": [
    [0,0,0,0,0],
    [0,1,1,1,0],
    [1,0,0,0,1]
  ]
}
]
```

## Assumptions and Limitations
- Fixed grid size: **3×5** (rows × columns)
- Paylines are evaluated as **single-path masks**, selecting one symbol per column
- Matching is **left-aligned and consecutive only**
- Asset pipeline assumes all textures are preloaded and valid
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
