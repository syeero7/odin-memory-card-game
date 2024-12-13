import { useState } from "react";
import Grid from "./components/Grid.jsx";
import Scoreboard from "./components/Scoreboard.jsx";

export default function App() {
  const [score, setScore] = useState({ current: 0, best: 0 });

  return (
    <main>
      <Scoreboard score={score} />
      <Grid score={score} setScore={setScore} />
    </main>
  );
}
