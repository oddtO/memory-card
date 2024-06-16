import { useState, useEffect } from "react";
import { useFetchPokemons } from "./use-fetch-pokemons";
import type { Pokemon } from "./pokemon";
import { getPokemonNames } from "./get-pokemon-names";
export function usePokemons() {
  const pokemons: Pokemon[] = useFetchPokemons();

  return pokemons;
}
