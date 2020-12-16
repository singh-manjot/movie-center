import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Title } from "../Title/Title";
import FilterRow from "../FilterRow/FilterRow";
import MovieCard from "../MovieCard/MovieCard";
import PageSwitch from "../PageSwitch/PageSwitch";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

const Home = (props) => {
  let defaultTitle = "Avengers";
  let defaultReleaseYear = "";
  let defaultMediaType = "";
  const previousFilters =
    props.location.state && props.location.state.previousFilters
      ? props.location.state.previousFilters
      : null;

  if (previousFilters) {
    defaultTitle = previousFilters.titleFilter;
    defaultMediaType = previousFilters.mediaTypeFilter;
    defaultReleaseYear = previousFilters.releaseYearFilter;
  }
  const [titleFilter, setTitleFilter] = useState(defaultTitle);
  const [releaseYearFilter, setReleaseYearFilter] = useState(
    defaultReleaseYear
  );
  const [mediaTypeFilter, setMediaTypeFilter] = useState(defaultMediaType);
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
        setTotalPages(pagesExpected);
        setMovies(response.data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleFilter, currentPage, mediaTypeFilter, releaseYearFilter]);

  return (
    <div>
      <Title>Movie Center</Title>
      <FilterRow onChange={onFilterChange} filterValues={previousFilters} />
      {loading ? (
        <Spinner size={100} loading={loading} />
      ) : movies ? (
        <>
          <span className="movieCardsContainer">
            {movies &&
              movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  id={movie.imdbID}
                  name={movie.Title}
                  imageUrl={movie.Poster}
                  releaseYear={movie.Year}
                  filters={{ mediaTypeFilter, releaseYearFilter, titleFilter }}
                ></MovieCard>
              ))}
          </span>
          <PageSwitch
            currentPage={currentPage}
            totalPages={totalPages}
            pageSwitch={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className="nothingFound">
          Nothing Found. Please adjust filters to find a title! <br />
          <img
            className="noPoster"
            src={process.env.PUBLIC_URL + "/nothing.png"}
            alt="Nothing Found"
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(Home);
