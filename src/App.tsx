import "./reset.css";
import { usePokemons } from "./use-pokemons";
import CardSelection from "./components/card-selection/component";
import Heading from "./components/heading/component";
import styles from "./App.module.scss";
import BackgroundImg from "./assets/wp9322897-pokemon-landscape-wallpapers.png";
import BackgroundPlaceholder from "./assets/wp9322897-pokemon-landscape-wallpapers (1).jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function App() {
  // const pokemons = usePokemons();

  return (
    <>
      <div className={styles.gameHolder}>
        <Heading></Heading>
        <div className={styles.cardCollectionWrapper}>
          <CardSelection></CardSelection>
        </div>
      </div>
    </>
  );
}

export default App;
