import "./MovieCard.css";
import { Link } from "react-router-dom";
const MovieCard = (props) => {
  return (
    <Link
      to={{
        pathname: `/movie/${props.name}`,
        state: {
          ...props
        },
      }}
    >
      <img className="movieCard" src={props.imageUrl} alt={props.name}></img>
    </Link>
  );
};

export default MovieCard;
