import { createContext, useContext } from "react";

type ContextState = [
  number,
  (score: number | { (oldScore: number): number }) => void,
];

export const scoreContext = createContext<ContextState>([0, () => {}]);

export function useScore() {
  return useContext(scoreContext);
}
