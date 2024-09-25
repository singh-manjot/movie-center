import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Movie from "./components/Movie/Movie";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
      <Route path="/movie/:title" component={Movie}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);