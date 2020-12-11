import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import "./Home.css";
import { Title } from "../Title/Title";
import FilterRow from "../FilterRow/FilterRow";
import MovieCard from "../MovieCard/MovieCard";
import PageSwitch from "../PageSwitch/PageSwitch";

const Home = () => {
  const [titleFilter, setTitleFilter] = useState("Avengers");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("movie");
  const [movies, setMovies] = useState(null);
  /// gotta use this
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
    let searchUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${titleFilter}&type=${mediaTypeFilter}&y=${releaseYearFilter}&page=${currentPage}`;
    axios
      .get(searchUrl)
      .then((response) => {
        const pagesExpected = Math.ceil(
          response.data.totalResults / response.data.Search.length
        );
        setTotalPages(pagesExpected);
        setMovies(response.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleFilter, releaseYearFilter, mediaTypeFilter, currentPage]);

  return (
    <div>
      <Title>Movie Center</Title>
      <FilterRow onChange={onFilterChange} />
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
      {/** Needs fixing for unnecessary renders */}
      {/* <PageSwitch
        currentPage={currentPage}
        totalPages={totalPages}
        pageSwitch={(page) => setCurrentPage(page)}
      /> */}
    </div>
  );
};

export default withRouter(Home);
