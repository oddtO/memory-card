import EndScreen from "../end-screen/component";
import BulbaImg from "../../assets/bulba.png";
import styles from "./styles.module.scss";
export default function WinScreen({
  onPlayAgain,
}: {
  onPlayAgain: () => void;
}) {
  return (
    <EndScreen
      imgUrl={BulbaImg}
      statusText="You Win"
      onPlayAgain={onPlayAgain}
      outcomeClass={styles.winScreen}
    />
  );
}
