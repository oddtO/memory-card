import "./reset.css";
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";

type url = string;
type Pokemon = {
  name: string;
  imgUrl: url;
};
const base = "https://pokeapi.co/api/v2/pokemon/";

function usePokemonNames(names: readonly string[]) {
  const [imgUrls, setImgUrls] = useState<url[]>([]);
  useEffect(() => {
    const namePromises = names.map((name) => {
      return fetch(base + name)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data.sprites.other.home.front_default;
        });
    });
    Promise.all(namePromises).then((urls) => {
      setImgUrls(urls);
    });
  }, [names]);

  return imgUrls;
}

const pokemonNames = ["ditto", "pikachu"];
function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const pokemonUrls = usePokemonNames(pokemonNames);

  useEffect(() => {
    if (pokemonUrls.length != 0) {
      const pokemonsTemp: Pokemon[] = [];
      for (let i = 0; i < pokemonUrls.length; i++) {
        pokemonsTemp.push({ name: pokemonNames[i], imgUrl: pokemonUrls[i] });
      }

      setPokemons(pokemonsTemp);
    }
  }, [pokemonUrls]);

  return pokemons;
}

function App() {
  const pokemons = usePokemons();

  return (
    <>
      {pokemons.length == 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <img src={pokemons[0].imgUrl} alt={pokemons[0].name} />
          <img src={pokemons[1].imgUrl} alt={pokemons[1].name} />
        </>
      )}
    </>
  );
}

export default App;
