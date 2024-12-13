import { getRandomNumbers } from "./functions.js";

export async function getPokemonData() {
  const POKEMON_LIMIT = 1000;
  const REQUIRED_POKEMON_COUNT = 20;
  const numbers = getRandomNumbers(POKEMON_LIMIT, REQUIRED_POKEMON_COUNT);
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const pokemonData = [];

  try {
    for await (const response of numbers.map((num) => fetch(url + num))) {
      if (!response.ok) throw new Error(`status : ${response.status}`);

      const data = await response.json();
      pokemonData.push({
        id: data.id,
        name: data.name,
        sprite: data.sprites.front_default,
      });
    }
  } catch (error) {
    console.error(error);
  }

  return pokemonData;
}
