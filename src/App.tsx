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
          {pokemons.map((pokemon, index) => {
            return <img key={index} src={pokemon.imgUrl} alt={pokemon.name} />;
          })}
        </>
      )}
    </>
  );
}

export default App;
