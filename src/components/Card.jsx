export default function Card({ id, name, source, onClick }) {
  return (
    <figure data-id={id} onClick={onClick} className="card">
      <img src={source} alt={name} />
      <figcaption>{name}</figcaption>
    </figure>
  );
}
