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
    <div className={styles.endScreen + " " + outcomeClass}>
      <div className={styles.endScreenMessage}>
        <img src={imgUrl} alt={statusText + " image"} />
        <p>{statusText}</p>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}
