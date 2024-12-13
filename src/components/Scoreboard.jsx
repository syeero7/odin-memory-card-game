export default function Scoreboard({ score }) {
  return (
    <header>
      <h1>Pokemon Memory Game</h1>
      <article className="score">
        <p className="best-score">Best Score: {score.best}</p>
        <p className="current-score">Score: {score.current}</p>
      </article>
    </header>
  );
}
