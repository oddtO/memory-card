import EndScreen from "../end-screen/component";
import BulbaImg from "../../assets/bulba.png";
import styles from "./styles.module.scss";
export default function LostScreen({
  onPlayAgain,
}: {
  onPlayAgain: () => void;
}) {
  return (
    <EndScreen
      imgUrl={BulbaImg}
      statusText="You lose"
      onPlayAgain={onPlayAgain}
      outcomeClass={styles.lostScreen}
    />
  );
}
