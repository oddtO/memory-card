export type url = string;
export type Pokemon = {
  name: string;
  imgUrl: url;
};

type Clickable = {
  isClicked: boolean;
};

export type ClickablePokemon = Pokemon & Clickable;
export const base = "https://pokeapi.co/api/v2/pokemon/";
export const POKEMONS_IN_GAME = 12;
