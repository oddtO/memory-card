import styles from "./styles.module.scss";
import Card from "../card/component";
import type { Pokemon } from "../../pokemon";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import BulbaImg from "../../assets/bulba.png";
import { updatePokemons } from "./updatePokemons";
import type { ClickablePokemon } from "../../pokemon";
import { useScore } from "../../score-context";
import { shuffle } from "lodash";
import { useSetGameStatus } from "../../game-status-context";
import CardFlipSound from "../../assets/Card Flip.mp3";
const pokemonBase: ClickablePokemon = {
  name: "bulbasaur",
  imgUrl: BulbaImg,
  isClicked: false,
};

const initialState = [
  { name: "bulbasaur0", imgUrl: BulbaImg, isClicked: false },
  { name: "bulbasaur1", imgUrl: BulbaImg, isClicked: false },
  { name: "bulbasaur2", imgUrl: BulbaImg, isClicked: false },
];

const shuffledInitialState = shuffle(initialState);
export default function CardSelection({
  initialPokemons,
  audioElem,
  backImgSrc,
}: {
  initialPokemons: ClickablePokemon[];
  audioElem: HTMLAudioElement | null;
  backImgSrc: string;
}) {
  const [pokemons, dispatchUpdate] = useReducer(
    updatePokemons,
    initialPokemons,
    shuffle,
  );

  const [turnCount, setTurnCount] = useState(0);
  const [, setCurrentScore] = useScore();
  const setGameStatus = useSetGameStatus();
  const shufflePokemons = () => {
    dispatchUpdate({ type: "shuffle" });
  };
  const updatePokemon = (index: number, pokemon: ClickablePokemon) => {
    dispatchUpdate({ type: "update", index, value: pokemon });
  };

  const resetGame = () => {
    dispatchUpdate({ type: "resetGame" });
  };

  const clickPokemon = (pokemon: ClickablePokemon, index: number) => {
    setTurnCount(turnCount + 1);
    if (pokemon.isClicked) {
      resetGame();
      setGameStatus("lost");
    } else {
      updatePokemon(index, {
        ...pokemon,
        isClicked: true,
      });

      setCurrentScore((currentScore: number) => {
        if (currentScore + 1 === pokemons.length) {
          resetGame();
          setGameStatus("won");
        } else shufflePokemons();
        return currentScore + 1;
      });
    }
  };

  return (
    <>
      <div className={styles.collection}>
        {pokemons.map((pokemon, index) => (
          <Card
            key={index}
            pokemon={pokemon}
            turnCount={turnCount}
            index={index}
            clickCb={clickPokemon}
            audioElem={index == pokemons.length - 1 ? audioElem : null}
            backImgSrc={backImgSrc}
          />
        ))}
      </div>
    </>
  );
}
