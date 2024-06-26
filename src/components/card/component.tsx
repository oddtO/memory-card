import { useEffect, useMemo, useRef, useState } from "react";
import type { Pokemon } from "../../pokemon";
import styles from "./styles.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";

type CardCSS = React.CSSProperties & {
  "--rotate-x": string;
  "--rotate-y": string;
};

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
}: {
  pokemon: ClickablePokemon;
  index: number;
  turnCount: number;
  clickCb: (pokemon: ClickablePokemon, index: number) => void;
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

  function attachListeners() {
    if (!frontSideRef.current) return;
    const frontSideElem = frontSideRef.current;
    frontSideElem.onpointermove = handleMouseMove;
    frontSideElem.onpointerleave = handleMouseLeave;
    frontSideElem.onclick = () => {
      clickCb(pokemon, index);
    };
  }

  function detachListeners() {
    if (!frontSideRef.current) return;
    const frontSideElem = frontSideRef.current;
    frontSideElem.onpointermove = null;
    frontSideElem.onpointerleave = null;
    frontSideElem.onclick = null;
    handleMouseLeave();
  }

  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (!isFirstRenderRef.current) return;
    isFirstRenderRef.current = false;
    attachListeners();
    const card = frontSideRef.current!.parentElement;
    card!.classList.remove(styles.cardEnter);
  }, [attachListeners]);
  const cardMovementRestriction = 3.8;
  const cardStyle: CardCSS = {
    "--rotate-y": `${offsetCoords.x / (cardMovementRestriction * -1)}deg`,
    "--rotate-x": `${offsetCoords.y / cardMovementRestriction}deg`,
  };
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        ref={nodeRef as CSSTransitionProps["ref"]}
        key={turnCount}
        addEndListener={(node, done) => {
          if (node.classList.contains(styles.cardExitActive)) detachListeners();
          else attachListeners();

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
              <div className={styles.backSide}></div>
            </div>
          );
        }}
      </CSSTransition>
    </SwitchTransition>
  );
}
