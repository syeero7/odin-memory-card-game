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

  const handleClick = (e) => {
    const id = e.target.closest(".card").dataset.id;

    setPokemonData((p) => shuffle(p));

    if (!clickedCards[id]) {
      setClickedCards((c) => ({ ...c, [id]: 1 }));
      setScore((s) => ({ ...s, current: s.current + 1 }));
      return;
    }

    setClickedCards({});

    if (score.current > score.best) {
      setScore((s) => ({ best: s.current, current: 0 }));
      return;
    }

    setScore((s) => ({ ...s, current: 0 }));
  };

  return (
    <article className="grid">
      {pokemonData.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          source={item.sprite}
          onClick={handleClick}
        />
      ))}
    </article>
  );
}
