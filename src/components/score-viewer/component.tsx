import styles from "./styles.module.scss";
import { useScore } from "../../score-context";
import { useState } from "react";

export default function ScoreViewer() {
  const [currentScore] = useScore();

  const [bestScore, setBestScore] = useState(0);
  if (currentScore > bestScore) setBestScore(currentScore);
  return (
    <ul className={styles.scoreViewer}>
      <li>
        <span>Score: </span>
        <span>{currentScore}</span>
      </li>
      <li>
        <span>Best score: </span>
        <span>{bestScore}</span>
      </li>
    </ul>
  );
}
