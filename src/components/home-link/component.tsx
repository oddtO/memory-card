import styles from "./styles.module.scss";
import DummyImg from "../../assets/bulba.png";

export default function HomeLink() {
  return (
    <a href="/" className={styles.homeLink}>
      <img src={DummyImg} alt="logo" />
      <span>Pokemem</span>
    </a>
  );
}
