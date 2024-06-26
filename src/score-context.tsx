import { createCustomContext } from "./create-custom-context";
export type ContextState = [
  number,
  (score: number | { (oldScore: number): number }) => void,
];

export const [ScoreContext, useScore] = createCustomContext<ContextState>([
  0,
  () => {},
]);
