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

const initialState = [pokemonBase, { name: "hello", imgUrl: BulbaImg }];
export default function CardSelection() {
  const [pokemons, dispatchUpdate] = useReducer(updatePokemons, initialState);

  const addPokemon = (pokemon) => {
    dispatchUpdate({ type: "add", value: pokemon });
  };

  const updatePokemon = (index, pokemon) => {
    dispatchUpdate({ type: "update", index, value: pokemon });
  };

  useEffect(() => {
    setTimeout(() => {
      updatePokemon(0, { ...pokemonBase, name: "charmander" });
    }, 2000);

    setTimeout(() => {
      addPokemon({ name: "squirtle", imgUrl: BulbaImg });
    }, 4000);
  }, []);

  return (
    <div className={styles.collection}>
      {pokemons.map((pokemon) => (
        <Card pokemon={pokemon} />
      ))}
    </div>
  );
}
