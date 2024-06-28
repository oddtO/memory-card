import type { ClickablePokemon } from "../../pokemon";
import _ from "lodash";
type Action =
  | { type: "update"; index: number; value: ClickablePokemon }
  | { type: "shuffle" | "resetGame" };

export function updatePokemons(
  state: ClickablePokemon[],
  action: Action,
): ClickablePokemon[] {
  switch (action.type) {
    case "shuffle":
      return shuffle(state);
    case "update":
      return updatePokemon(state, action.index, action.value);
    case "resetGame":
      return shuffle(resetClicks(state));
    default:
      throw new Error(`Unknown action type:`);
  }
}

function resetClicks(state: ClickablePokemon[]) {
  return state.map((pokemon) => {
    return { ...pokemon, isClicked: false };
  });
}
function shuffle(state: ClickablePokemon[]) {
  return _.shuffle(state);
}

function updatePokemon(
  state: ClickablePokemon[],
  index: number,
  pokemon: ClickablePokemon,
) {
  return state.map((p, i) => (i === index ? pokemon : p));
}
