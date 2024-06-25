import "./reset.css";
import "./app.css";
import { usePokemons } from "./use-pokemons";
import CardSelection from "./components/card-selection/component";
import Heading from "./components/heading/component";
import styles from "./App.module.scss";
import BackgroundImg from "./assets/wp9322897-pokemon-landscape-wallpapers.png";
import BackgroundPlaceholder from "./assets/wp9322897-pokemon-landscape-wallpapers (1).jpg";
import { scoreContext } from "./score-context";
import { bestScoreContext } from "./score-context";
import { useState } from "react";

function App() {
  // const pokemons = usePokemons();

  const [currentScore, setCurrentScore] = useState(0);

  return (
    <>
      <scoreContext.Provider value={[currentScore, setCurrentScore]}>
        <div className={styles.gameHolder}>
          <Heading></Heading>

          <div className={styles.cardCollectionWrapper}>
            <CardSelection></CardSelection>
          </div>
        </div>
      </scoreContext.Provider>
    </>
  );
}

export default App;
