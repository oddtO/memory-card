import styles from "./styles.module.scss";
import Card from "../card/component";
import type { Pokemon } from "../../pokemon";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import BulbaImg from "../../assets/bulba.png";
import { updatePokemons } from "./updatePokemons";
import type { ClickablePokemon } from "./updatePokemons";

const pokemonBase: ClickablePokemon = {
  name: "bulbasaur",
  imgUrl: BulbaImg,
  isClicked: false,
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

  const [turnCount, setTurnCount] = useState(0);
  const addPokemon = (pokemon: ClickablePokemon) => {
    dispatchUpdate({ type: "add", value: pokemon });
  };

  const updatePokemon = (index: number, pokemon: ClickablePokemon) => {
    dispatchUpdate({ type: "update", index, value: pokemon });
  };

  const clickPokemon = (pokemon: ClickablePokemon, index: number) => {
    setTurnCount(turnCount + 1);
    if (pokemon.isClicked) {
      alert("is clicked already");
    } else {
      updatePokemon(index, {
        ...pokemon,
        isClicked: true,
      });
    }
  };

  return (
    <div className={styles.collection}>
      {pokemons.map((pokemon, index) => (
        <Card
          key={index}
          pokemon={pokemon}
          turnCount={turnCount}
          index={index}
          clickCb={clickPokemon}
        />
      ))}
    </div>
  );
}
