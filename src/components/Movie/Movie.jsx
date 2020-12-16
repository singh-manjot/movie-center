import { withRouter } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { Title as PageTitle } from "../Title/Title";
import { getUrlIfImageExists } from "../helpers";
import "./Movie.css";
import { Link } from "react-router-dom";

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
          {Plot && Plot !== "N/A" && (
            <>
              <div className="subHeading"> Plot</div>
              <div>{Plot}</div>{" "}
            </>
          )}
          <div className="subHeading"> Other Details</div>
          {Director !== "N/A" && <div>Directed By: {Director}</div>}
          {Production && <div>Produced By: {Actors}</div>}
          <div>Actors: {Actors}</div>
          {Rated !== "N/A" && <div>PEGI Rating: {Rated}</div>}

          <div>Release Date: {Released}</div>
          <div>Genre: {Genre}</div>
          {Runtime && (
            <div>
              Runtime:{Math.round(Runtime.substr(0, 3) / 60)} hours and{" "}
              {Runtime.substr(0, 3) % 60} minutes
            </div>
          )}

          {Awards !== "N/A" && <div> Awards: {Awards}</div>}
          {imdbRating !== "N/A" && <div> IMDB rating: {imdbRating}</div>}
          {ratings.length !== 0 && (
            <div>
              Other Ratings:{" "}
              {ratings.map(
                (rating) => rating.Source + " (" + rating.Value + ")"
              )}
            </div>
          )}
        </div>
        <Link
          to={{
            pathname: "/",
            state: {
              previousFilters: props.location.state.filters,
            },
          }}
        >
          <button className="goBack">Return to Home</button>
        </Link>
      </div>
    );
  }

  return pageContents;
};

export default withRouter(Movie);
