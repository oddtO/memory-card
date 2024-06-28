import { useFetchPokemons } from "./use-fetch-pokemons";
import type { ClickablePokemon } from "./pokemon";
import { usePreload } from "./use-preload";
import { useEffect, useMemo, useState } from "react";
export function usePokemons() {
  const pokemons: ClickablePokemon[] = useFetchPokemons();
  const [isFinished, setIsFinished] = useState(false);
  const memoPokemonsUrls = useMemo(() => {
    return pokemons.map((pokemon) => pokemon.imgUrl);
  }, [pokemons]);
  const preloader = usePreload(memoPokemonsUrls);

  useMemo(() => {
    if (
      preloader.isFullBytesKnown &&
      preloader.bytesLoaded == preloader.totalBytesToLoad
    ) {
      pokemons.forEach((pokemon, index) => {
        pokemon.imgUrl = preloader.assetUrls[index];
      });
      setIsFinished(true);
    }
  }, [
    pokemons,
    preloader.bytesLoaded,
    preloader.isFullBytesKnown,
    preloader.totalBytesToLoad,
    preloader.assetUrls,
  ]);

  return { pokemons: isFinished ? pokemons : [], isFinished, preloader };
}
