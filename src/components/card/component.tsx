import { useRef } from "react";
import type { Pokemon } from "../../pokemon";
import styles from "./styles.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";
export default function Card({ pokemon }: { pokemon: Pokemon }) {
  const nodeRef = useRef(null);
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        ref={nodeRef}
        key={pokemon.name}
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
        classNames={{
          enter: styles.cardEnter,
          enterActive: styles.cardEnterActive,
          exit: styles.cardExit,
          exitActive: styles.cardExitActive,
        }}
      >
        {(state) => {
          return (
            <div className={styles.card} ref={nodeRef}>
              <div className={styles.frontSide}>
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
