import { Link } from "react-router-dom";

export default function Cuisines() {
  let types = [
    "canteen",
    "bukka",
    "eatery",
    "seafood",
    "pizza",
    "vegan",
    "pasta",
    "american",
    "japanese",
  ];

  return (
    <div className="text-center">
      <h1>CUSINES</h1>
      <div className="container cusines">
        {types.map((tp, idx) => (
          <Link
            key={`cusines-btn-${idx}`}
            to={`/cusines/${tp}`}
            className="cusines-btn"
          >
            {tp}
          </Link>
        ))}
      </div>
    </div>
  );
}
