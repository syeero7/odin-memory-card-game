import { useEffect, useState } from "react";
import Card from "./Card.jsx";

export default function Grid({ score, setScore }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedCards, setClickedCards] = useState({});

  useEffect(() => {
    const getData = async () => setPokemonData(await getPokemonData());
    getData();
  }, []);

  const handleClick = (id) => {
    setPokemonData((prev) => shuffle(prev));

    if (!clickedCards[id]) {
      setClickedCards((prev) => ({ ...prev, [id]: 1 }));
      setScore((prev) => ({ ...prev, current: prev.current + 1 }));
      return;
    }

    setClickedCards({});

    if (score.current > score.best) {
      setScore((prev) => ({ best: prev.current, current: 0 }));
      return;
    }

    setScore((prev) => ({ ...prev, current: 0 }));
  };

  return (
    <article className="grid">
      {pokemonData.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          source={item.sprite}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </article>
  );
}

const getPokemonData = async () => {
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
};

const getRandomNumbers = (maxLimit, maxLength) => {
  const numbers = {};
  const randomNumbers = [];

  while (randomNumbers.length !== maxLength) {
    const randomNumber = Math.floor(Math.random() * maxLimit) + 1;

    if (!numbers[randomNumber]) {
      numbers[randomNumber] = 1;
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
};

const shuffle = (array) => {
  const newArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};
