import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { Pokemon } from "../../pokemon";
import styles from "./styles.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import PokeballImg from "../../assets/1.jpg";

type CardCSS = React.CSSProperties & {
  "--rotate-x": string;
  "--rotate-y": string;
};

const AUDIO_FIRST_PART_DURATION = 200;
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { ClickablePokemon } from "../../pokemon";
function calculateCenter(node: HTMLDivElement) {
  const rect = node.getBoundingClientRect();
  const coords = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };

  return coords;
}
export default function Card({
  pokemon,
  index,
  turnCount,
  clickCb,
  audioElem,
  backImgSrc,
}: {
  pokemon: ClickablePokemon;
  index: number;
  turnCount: number;
  clickCb: (pokemon: ClickablePokemon, index: number) => void;
  audioElem: HTMLAudioElement | null;
  backImgSrc: string;
}) {
  const nodeRef = useRef(null);
  const frontSideRef = useRef<HTMLDivElement>(null);

  const [offsetCoords, setOffsetCoords] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent) {
    const center = calculateCenter(frontSideRef.current as HTMLDivElement);
    const newCoords = {
      x: event.clientX - center.x,
      y: event.clientY - center.y,
    };

    setOffsetCoords(newCoords);
  }
  function handleMouseLeave() {
    setOffsetCoords({ x: 0, y: 0 });
  }

  const attachListeners = useCallback(
    function attachListeners() {
      if (!frontSideRef.current) return;
      const frontSideElem = frontSideRef.current;
      frontSideElem.onpointermove = handleMouseMove;
      frontSideElem.onpointerleave = handleMouseLeave;
      frontSideElem.onclick = () => {
        clickCb(pokemon, index);
      };
    },
    [clickCb, index, pokemon],
  );

  function detachListeners() {
    if (!frontSideRef.current) return;
    const frontSideElem = frontSideRef.current;
    frontSideElem.onpointermove = null;
    frontSideElem.onpointerleave = null;
    frontSideElem.onclick = null;
    handleMouseLeave();
  }

  const cardBeforeHideCb = (audioElem: HTMLAudioElement | null) => {
    detachListeners();

    if (!audioElem) return;

    audioElem.play();

    setTimeout(() => audioElem.pause(), AUDIO_FIRST_PART_DURATION);
  };

  const cardBeforeShowCb = (audioElem: HTMLAudioElement | null) => {
    attachListeners();
    audioElem?.play();
  };
  const cardMovementRestriction = 3.8;
  const isFirstRenderRef = useRef(true);
  const cardStyle: CardCSS = {
    "--rotate-y": `${offsetCoords.x / (cardMovementRestriction * -1)}deg`,
    "--rotate-x": `${offsetCoords.y / cardMovementRestriction}deg`,
    transitionDelay: isFirstRenderRef.current ? "0.5s" : "",
  };
  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    isFirstRenderRef.current = false;
    attachListeners();
    const card = frontSideRef.current!.parentElement;
    card!.classList.remove(styles.cardEnter);
    setTimeout(() => {
      card!.style.transitionDelay = "";
    }, parseFloat(card!.style.transitionDelay));
  }, [attachListeners, audioElem]);
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        ref={nodeRef as CSSTransitionProps["ref"]}
        key={turnCount}
        addEndListener={(node, done) => {
          if (node.classList.contains(styles.cardExitActive))
            cardBeforeHideCb(audioElem);
          else cardBeforeShowCb(audioElem);

          function handleTransitionEnd() {
            done();
            node.removeEventListener("transitionend", handleTransitionEnd);
          }
          node.addEventListener("transitionend", handleTransitionEnd, false);
        }}
        classNames={{
          enter: styles.cardEnter,
          enterActive: styles.cardEnterActive,
          exit: styles.cardExit,
          exitActive: styles.cardExitActive,
        }}
      >
        {() => {
          return (
            <div
              className={styles.card + " " + styles.cardEnter}
              ref={nodeRef}
              style={cardStyle}
            >
              <div className={styles.frontSide} ref={frontSideRef}>
                <figure>
                  <img src={pokemon.imgUrl} alt={pokemon.name} />
                  <figcaption>
                    <h2>{pokemon.name}</h2>
                  </figcaption>
                </figure>
              </div>
              <div className={styles.backSide}>
                <img src={backImgSrc} alt="backside" />
              </div>
            </div>
          );
        }}
      </CSSTransition>
    </SwitchTransition>
  );
}
