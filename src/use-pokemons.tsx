import { useState, useEffect } from "react";
import { usePokemonNames } from "./use-pokemon-names";
import type { Pokemon } from "./pokemon";
import { getPokemonNames } from "./get-pokemon-names";
export function usePokemons() {
  // const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const pokemons: Pokemon[] = [];
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  useEffect(() => {
    async function waitPokemonNames() {
      if (pokemonNames.length != 0) return;
      const pokemonNamesTemp = await getPokemonNames();
      setPokemonNames(pokemonNamesTemp);
    }
    waitPokemonNames();
  }, [pokemonNames, setPokemonNames]);

  const pokemonUrls = usePokemonNames(pokemonNames);

  if (pokemonUrls.length != 0) {
    for (let i = 0; i < pokemonUrls.length; i++) {
      pokemons.push({ name: pokemonNames[i], imgUrl: pokemonUrls[i] });
    }
  }

  return pokemons;
}
