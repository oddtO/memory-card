import { createContext, useContext } from "react";
export function createCustomContext<Type>(
  args: Type,
): [typeof context, () => Type] {
  const context = createContext<Type>(args);

  return [context, () => useContext(context)];
}
