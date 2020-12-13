import { Link } from "react-router-dom";
import "./MovieCard.css";
import { getUrlIfImageExists } from "../helpers";

const MovieCard = (props) => {
  return (
    <>
      <Link
        to={{
          pathname: `/movie/${props.name}`,
          state: {
            ...props,
          },
        }}
      >
        <img
          className="poster"
          title={props.name}
          src={getUrlIfImageExists(props.imageUrl)}
          alt={props.name}
        />
      </Link>
    </>
  );
};

export default MovieCard;
