import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Title as PageTitle } from "../Title/Title";
import { getUrlIfImageExists } from "../helpers";
import "./Movie.css";

const Movie = (props) => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  let pageContents = <Spinner size={100} />;
  useEffect(() => {
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${props.location.state.id}&plot=full`
      )
      .then((response) => {
        setLoading(false);
        setMovieData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.location.state.id]);

  if (!loading && movieData) {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Actors,
      Plot,
      Awards,
      Poster,
      Ratings,
      Type,
      imdbRating,
      Production,
    } = movieData;

    let ratings = Ratings.filter(
      (rating) => rating.Source === "Rotten Tomatoes"
    );

    pageContents = (
      <div className="movieContainer">
        <PageTitle>
          {Title} ({Year})
        </PageTitle>
        <img src={getUrlIfImageExists(Poster)} alt={Title}></img>
        <div className="data">
          <div className="subHeading"> Plot</div>
          <div>{Plot}</div>
          <div className="subHeading"> Other Details</div>
          <div>
            Directed By {Director} and produced by {Production} in {Year}, "
            {Title}" was released on {Released}, and starred {Actors}. Rated:
            {Rated}, the {Type}'s total runtime is{" "}
            {Math.round(Runtime.substr(0, 3) / 60)} hours and{" "}
            {Runtime.substr(0, 3) % 60} minutes.
          </div>
          <div className='da'>
            Genre: {Genre}
          </div>
          <div> Awards: {Awards}</div>
          <div> IMDB rating: {imdbRating}</div>
          <div>
            Other Ratings:{" "}
            {ratings.map((rating) => rating.Source + " (" + rating.Value + ")")}
          </div>
        </div>
      </div>
    );
  }

  return pageContents;
};

export default withRouter(Movie);
