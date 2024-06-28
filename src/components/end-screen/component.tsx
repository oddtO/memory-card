import styles from "./styles.module.scss";

export default function EndScreen({
  imgUrl,
  statusText,
  onPlayAgain,
  outcomeClass,
}: {
  imgUrl: string;
  statusText: string;
  onPlayAgain: () => void;
  outcomeClass: typeof styles.endScreen;
}) {
  return (
    <div
      className={styles.endScreen + " " + outcomeClass}
      style={{ backgroundImage: imgUrl }}
    >
      <div className={styles.endScreenMessage}>
        <p>{statusText}</p>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}
