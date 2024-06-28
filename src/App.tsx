import "./reset.css";
import "./app.css";
import { usePokemons } from "./use-pokemons";
import CardSelection from "./components/card-selection/component";
import Heading from "./components/heading/component";
import styles from "./App.module.scss";
import { ScoreContext } from "./score-context";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WinScreen from "./components/win-screen/component";
import LostScreen from "./components/lost-screen/component";
import type { ContextState } from "./score-context";
import { GameStatusContext } from "./game-status-context";
import LoadingScreen from "./components/loading-screen/component";
import CardFlipSound from "./assets/Card Flip.mp3";
import { usePreload } from "./use-preload";
import AudioIcon from "./assets/wondicon-ui-free-speaker_111240.svg";
import LineIcon from "./assets/straight-horizontal-line_icon-icons.com_74237.svg";
import CardBackSideImg from "./assets/1.jpg";
const audioPreloads = [CardFlipSound];
const cardBackSidePreloaderWrapper = [CardBackSideImg];
function App() {
  const audioPreloader = usePreload(audioPreloads);
  const { pokemons, preloader: imgsPreloader } = usePokemons();
  const backCardPreloader = usePreload(cardBackSidePreloaderWrapper);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );

  const preloaders = useMemo(
    () => [imgsPreloader, audioPreloader, backCardPreloader],
    [imgsPreloader, audioPreloader, backCardPreloader],
  );
  const onPlayAgain = useCallback(() => {
    setCurrentScore(0);
    setGameStatus("playing");
  }, [setGameStatus]);

  const scoreState: ContextState = useMemo(() => {
    return [currentScore, setCurrentScore];
  }, [currentScore, setCurrentScore]);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [isAudioMuted, setIsAudioMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.muted = isAudioMuted;
    }
  }, [isAudioMuted, audioRef]);

  const isLoadScreenOn = preloaders.every((preloader) => preloader.isLoaded());
  return (
    <>
      {gameStatus == "won" && <WinScreen onPlayAgain={onPlayAgain} />}

      {gameStatus == "lost" && <LostScreen onPlayAgain={onPlayAgain} />}
      <audio muted ref={audioRef} src={audioPreloader.assetUrls[0]}>
        Your browser does not support audio element
      </audio>
      <ScoreContext.Provider value={scoreState}>
        <div className={styles.gameHolder}>
          <Heading></Heading>

          <div className={styles.cardCollectionWrapper}>
            <GameStatusContext.Provider value={setGameStatus}>
              {isLoadScreenOn ? (
                <CardSelection
                  initialPokemons={pokemons}
                  audioElem={audioRef.current}
                  backImgSrc={backCardPreloader.assetUrls[0]}
                ></CardSelection>
              ) : (
                <LoadingScreen preloaders={preloaders} />
              )}
            </GameStatusContext.Provider>
          </div>
          <div
            className={styles.audioToggler}
            onClick={() => setIsAudioMuted(!isAudioMuted)}
          >
            <img src={AudioIcon} alt="audio icon"></img>
            <img
              style={{ visibility: isAudioMuted ? "visible" : "hidden" }}
              className={styles.line}
              src={LineIcon}
              alt="line icon"
            ></img>
          </div>
        </div>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
