//Must follow a series of increasing numbers
export const SPIN_CONFIG = {
  //normal
  columnStopTimes: [500, 1000, 1250, 1750, 2000],

  //fast
  // columnStopTimes: [10,20,30,40,50]
};

export const ROWS = 3;
export const COLS = 5;

export const ASSET_CONFIG = {
  symbols: "SlotMachineData/Symbols.json",
  reels: "SlotMachineData/Reelset.json",
  paylines: "SlotMachineData/Paylines.json",
} as const;
