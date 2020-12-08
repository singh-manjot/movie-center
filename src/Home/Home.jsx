import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import "./Home.css";
import { Title } from "../components/Title/Title";

const Home = () => {
  const [titleFilter, setTitleFilter] = useState("Avengers");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [mediaTypeFilter, setMediaTypeFilter] = useState("movie");
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let searchUrl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${titleFilter}&type=${mediaTypeFilter}&y=${releaseYearFilter}&page=${page}`;
    axios
      .get(searchUrl)
      .then((response) => {
        console.log(response);
        setMovies(response.data.Search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [titleFilter, releaseYearFilter, mediaTypeFilter, page]);

  return <div><Title>Movie Center</Title></div>;
};

export default withRouter(Home);
