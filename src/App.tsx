import "./reset.css";
import { usePokemons } from "./use-pokemons";
import "./App.css";

function App() {
  const pokemons = usePokemons();

  return (
    <>
      {pokemons.length == 0 ? (
        <div>loading...</div>
      ) : (
        <>
          <img src={pokemons[0].imgUrl} alt={pokemons[0].name} />
          <img src={pokemons[1].imgUrl} alt={pokemons[1].name} />
        </>
      )}
    </>
  );
}

export default App;
