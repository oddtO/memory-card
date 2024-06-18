import styles from "./styles.module.scss";

export default function ScoreViewer() {
  return (
    <ul className={styles.scoreViewer}>
      <li>
        <span>Score: </span>
        <span>0</span>
      </li>
      <li>
        <span>Best score: </span>
        <span>0</span>
      </li>
    </ul>
  );
}
