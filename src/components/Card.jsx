export default function Card({ id, name, source, onClick }) {
  return (
    <figure data-id={id} onClick={onClick} className="card">
      <img src={source} alt={name} width="96" height="96" />
      <figcaption>{name}</figcaption>
    </figure>
  );
}
