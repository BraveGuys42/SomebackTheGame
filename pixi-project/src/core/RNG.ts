export type RNG = () => number;

export const defaultRNG: RNG = () => Math.random();
export function seedRNG(seed: number): RNG {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}
