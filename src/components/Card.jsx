export default function Card({ name, source, onClick }) {
  return (
    <div className="card">
      <figure onClick={onClick}>
        <img src={source} alt={name} width="96" height="96" />
        <figcaption>{name}</figcaption>
      </figure>
    </div>
  );
}
