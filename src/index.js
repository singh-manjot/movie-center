import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './Home/Home';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Route path="/" component={Home}></Route>
    {/* <Route path="/movie/" component={Movie}></Route> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
