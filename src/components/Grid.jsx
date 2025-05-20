import { useEffect, useState } from "react";
import { getPokemonData } from "../utils/pokemonData.js";
import { shuffle } from "../utils/functions.js";
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
