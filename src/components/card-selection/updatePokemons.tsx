import type { Pokemon } from "../../pokemon";
type Action =
  | { type: "add"; value: ClickablePokemon }
  | { type: "update"; index: number; value: ClickablePokemon };

type Clickable = {
  isClicked: boolean;
};

export type ClickablePokemon = Pokemon & Clickable;

export function updatePokemons(
  state: ClickablePokemon[],
  action: Action,
): ClickablePokemon[] {
  switch (action.type) {
    case "add":
      return addPokemon(state, action.value);
    case "update":
      return updatePokemon(state, action.index, action.value);
    default:
      throw new Error(`Unknown action type:`);
      return;
  }
}

function addPokemon(state: ClickablePokemon[], pokemon: ClickablePokemon) {
  return [...state, pokemon];
}

function updatePokemon(
  state: ClickablePokemon[],
  index: number,
  pokemon: ClickablePokemon,
) {
  return state.map((p, i) => (i === index ? pokemon : p));
}
