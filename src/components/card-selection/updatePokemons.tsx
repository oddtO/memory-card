import type { Pokemon } from "../../pokemon";
type Action =
  | { type: "add"; value: Pokemon }
  | { type: "update"; index: number; value: Pokemon };

type Pokemons = Pokemon[];

export function updatePokemons(state: Pokemons, action: Action): Pokemons {
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

function addPokemon(state: Pokemons, pokemon: Pokemon) {
  return [...state, pokemon];
}

function updatePokemon(state: Pokemons, index: number, pokemon: Pokemon) {
  return [...state.slice(0, index), pokemon, ...state.slice(index + 1)];
}
