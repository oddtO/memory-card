import { createCustomContext } from "./create-custom-context";
type ContextState = React.Dispatch<
  React.SetStateAction<"playing" | "won" | "lost">
>;

export const [GameStatusContext, useSetGameStatus] =
  createCustomContext<ContextState>(() => {});
