import { useState, useEffect } from "react";
import type { Pokemon } from "./pokemon";
import { base, POKEMONS_IN_GAME } from "./pokemon";

/* import Bulba from "./assets/bulba.png";
async function fetch(url: string) {
  //mock return pokemon
  return {
    json: async () => {
      return {
        name: "bulbasaur",
        sprites: {
          other: {
            home: {
              front_default: Bulba,
            },
          },
        },
      };
    },
  };
} */

export function useFetchPokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    const pokemonPromises: Promise<Pokemon>[] = [];
    for (let i = 1; i < POKEMONS_IN_GAME; i++) {
      const promise = fetch(base + i)
        .then((response) => {
          return response.json();
        })
        .then((data): Pokemon => {
          return {
            name: data.name,
            imgUrl: data.sprites.other.home.front_default,
          };
        });

      pokemonPromises.push(promise);
    }
    Promise.all(pokemonPromises).then((pokemons) => {
      setPokemons(pokemons);
    });
  }, []);

  return pokemons;
}
