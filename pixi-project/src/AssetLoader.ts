import { ASSET_CONFIG } from "./config/GameConfigs";
import { SymbolData, ReelsetData, PaylineData } from "./types/Types";

export class AssetLoader {
  constructor(private config: typeof ASSET_CONFIG) {}

  async loadAll(): Promise<{
    symbols: SymbolData[];
    reels: ReelsetData[];
    paylines: PaylineData[];
  }> {
    try {
      const [symbols, reels, paylines] = await Promise.all([
        this.loadJSON<SymbolData[]>(this.config.symbols),
        this.loadJSON<ReelsetData[]>(this.config.reels),
        this.loadJSON<PaylineData[]>(this.config.paylines),
      ]);

      return { symbols, reels, paylines };
    } catch (err) {
      throw new Error(`[AssetLoader] Failed to load assets: ${String(err)}`);
    }
  }

  async loadJSON<T>(url: string): Promise<T> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to load ${url}: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(`Error loading ${url}`, err);
      throw err;
    }
  }
}
