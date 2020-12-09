import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import "./Home.css";
import { Title } from "../Title/Title";
import FilterRow from "../FilterRow/FilterRow";
import MovieCard from "../MovieCard/MovieCard";

const Home = () => {
  const [titleFilter, setTitleFilter] = useState("Avengers");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("movie");
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  const filters = ["Title", "Release Year", "Media Type"];

  const onFilterChange = (filterType, value) => {
    switch (filterType) {
      case "Title":
        let title = value === "" ? "Avengers" : value;
        setTitleFilter(title);
        break;
      case "Release Year":
        setReleaseYearFilter(value);
        break;
      case "Media Type":
        setMediaTypeFilter(value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    let searchUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${titleFilter}&type=${mediaTypeFilter}&y=${releaseYearFilter}&page=${page}`;
    axios
      .get(searchUrl)
      .then((response) => {
        setMovies(response.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleFilter, releaseYearFilter, mediaTypeFilter, page]);

  return (
    <div>
      <Title>Movie Center</Title>
      <FilterRow filters={filters} onChange={onFilterChange} />
      {movies &&
        movies.map((movie, i) => (
          <MovieCard key={i} name={movie.Title}></MovieCard>
        ))}
    </div>
  );
};

export default withRouter(Home);
