import { base } from "./pokemon";

const POKEMONS_IN_GAME = 12;

const query = new URL(base);
query.searchParams.append("limit", String(0));
query.searchParams.append("offset", POKEMONS_IN_GAME.toString());
export async function getPokemonNames() {
  // const pokemonCountResp = await fetch(query);
  // const pokemonCount = (await pokemonCountResp.json()) as { count: number };
  const response = await fetch(query);
  const data = await response.json();

  return data.results.map((result: { name: string }) => {
    return result.name;
  });
}
