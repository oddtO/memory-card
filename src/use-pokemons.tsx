import { useState, useEffect } from "react";
import { usePokemonNames } from "./use-pokemon-names";
import type { Pokemon } from "./pokemon";

const pokemonNames = ["ditto", "pikachu"];
export function usePokemons() {
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const pokemons: Pokemon[] = [];

  const pokemonUrls = usePokemonNames(pokemonNames);

  if (pokemonUrls.length != 0) {
    for (let i = 0; i < pokemonUrls.length; i++) {
      pokemons.push({ name: pokemonNames[i], imgUrl: pokemonUrls[i] });
    }
  }

  return pokemons;
}
