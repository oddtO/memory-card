import { useFetchPokemons } from "./use-fetch-pokemons";
import type { ClickablePokemon } from "./pokemon";
export function usePokemons() {
  const pokemons: ClickablePokemon[] = useFetchPokemons();

  return pokemons;
}
