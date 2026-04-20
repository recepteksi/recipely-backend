export const Difficulty = {
  Easy: 'EASY',
  Medium: 'MEDIUM',
  Hard: 'HARD',
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const isDifficulty = (v: unknown): v is Difficulty =>
  v === Difficulty.Easy || v === Difficulty.Medium || v === Difficulty.Hard;
