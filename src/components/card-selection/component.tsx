import styles from "./styles.module.scss";
import Card from "../card/component";
import type { Pokemon } from "../../pokemon";
import { useEffect, useReducer, useRef, useState } from "react";
import BulbaImg from "../../assets/bulba.png";
import { updatePokemons } from "./updatePokemons";

const pokemonBase: Pokemon = {
  name: "bulbasaur",
  imgUrl: BulbaImg,
};

const initialState = [
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
  pokemonBase,
];
export default function CardSelection() {
  const [pokemons, dispatchUpdate] = useReducer(updatePokemons, initialState);

  const addPokemon = (pokemon) => {
    dispatchUpdate({ type: "add", value: pokemon });
  };

  const updatePokemon = (index, pokemon) => {
    dispatchUpdate({ type: "update", index, value: pokemon });
  };

  return (
    <div className={styles.collection}>
      {pokemons.map((pokemon) => (
        <Card pokemon={pokemon} />
      ))}
    </div>
  );
}
