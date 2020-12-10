import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import Axios from "axios";

const Movie = (props) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${props.location.state.id}`
    )
      .then((response) => {
        setMovieData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.location.state.id]);
  return movieData ? (
    <h1 style={{ color: "white" }}>{movieData.Plot}</h1>
  ) : (
    <h2>OH no, we've got no spinner yet!</h2>
  );
};

export default withRouter(Movie);
