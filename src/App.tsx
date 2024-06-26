import "./reset.css";
import "./app.css";
import { usePokemons } from "./use-pokemons";
import CardSelection from "./components/card-selection/component";
import Heading from "./components/heading/component";
import styles from "./App.module.scss";
import { ScoreContext } from "./score-context";
import { useCallback, useMemo, useState } from "react";
import WinScreen from "./components/win-screen/component";
import LostScreen from "./components/lost-screen/component";
import type { ContextState } from "./score-context";
import { GameStatusContext } from "./game-status-context";
function App() {
  // const pokemons = usePokemons();

  const [currentScore, setCurrentScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  const onPlayAgain = useCallback(() => {
    setCurrentScore(0);
    setGameStatus("playing");
  }, [setGameStatus]);

  const scoreState: ContextState = useMemo(() => {
    return [currentScore, setCurrentScore];
  }, [currentScore, setCurrentScore]);

  return (
    <>
      {gameStatus == "won" && <WinScreen onPlayAgain={onPlayAgain} />}

      {gameStatus == "lost" && <LostScreen onPlayAgain={onPlayAgain} />}
      <ScoreContext.Provider value={scoreState}>
        <div className={styles.gameHolder}>
          <Heading></Heading>

          <div className={styles.cardCollectionWrapper}>
            <GameStatusContext.Provider value={setGameStatus}>
              <CardSelection></CardSelection>
            </GameStatusContext.Provider>
          </div>
        </div>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
