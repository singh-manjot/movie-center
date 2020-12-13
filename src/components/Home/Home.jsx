import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import "./Home.css";
import { Title } from "../Title/Title";
import FilterRow from "../FilterRow/FilterRow";
import MovieCard from "../MovieCard/MovieCard";
import PageSwitch from "../PageSwitch/PageSwitch";
import Spinner from "../Spinner/Spinner";
const Home = () => {
  const [titleFilter, setTitleFilter] = useState("Avengers");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("movie");
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onFilterChange = (filterType, value) => {
    switch (filterType) {
      case "Title":
        let title = value === "" ? "Avengers" : value;
        setCurrentPage(1);
        setTitleFilter(title);
        break;
      case "Release Year":
        setCurrentPage(1);
        console.log("Setting year", value);
        setReleaseYearFilter(value);
        break;
      case "Media Type":
        setCurrentPage(1);
        setMediaTypeFilter(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setLoading(true);
    let searchUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${titleFilter}&type=${mediaTypeFilter}&y=${releaseYearFilter}&page=${currentPage}`;
    axios
      .get(searchUrl)
      .then((response) => {
        const pagesExpected = response.data.Search
          ? Math.ceil(response.data.totalResults / 10)
          : 0;
        console.log("Expecting pages ", pagesExpected);
        setTotalPages(pagesExpected);
        setMovies(response.data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleFilter, releaseYearFilter, mediaTypeFilter, currentPage]);

  return (
    <div>
      <Title>Movie Center</Title>
      <FilterRow onChange={onFilterChange} />
      {movies ? (
        <>
          <div className="movieCardsContainer">
            {movies &&
              movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  id={movie.imdbID}
                  name={movie.Title}
                  imageUrl={movie.Poster}
                  releaseYear={movie.Year}
                ></MovieCard>
              ))}
          </div>
          <PageSwitch
            currentPage={currentPage}
            totalPages={totalPages}
            pageSwitch={(page) => setCurrentPage(page)}
          />
        </>
      ) : loading ? (
        <Spinner size={100} loading={!movies} />
      ) : (
        <div className="nothingFound">
          Nothing Found. Please adjust filters to find a title! <br />
          <img
            src={process.env.PUBLIC_URL + "/nothing.png"}
            alt="Nothing Found"
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(Home);
