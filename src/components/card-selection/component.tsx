import styles from "./styles.module.scss";
import Card from "../card/component";
import type { Pokemon } from "../../pokemon";
import { useEffect, useState } from "react";
import BulbaImg from "../../assets/bulba.png";

const pokemonBase: Pokemon = {
  name: "bulbasaur",
  imgUrl: BulbaImg,
};

export default function CardSelection() {
  const [pokemon, setPokemon] = useState<Pokemon>(pokemonBase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPokemon((p) => {
        return { ...p, name: "hehw" };
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      setPokemon((p) => {
        return { ...p, name: "Crabominable" };
      });
    }, 7000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={styles.collection}>
      <Card pokemon={pokemon}></Card>
    </div>
  );
}
