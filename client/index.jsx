import React, { useState, useEffect } from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  withRouter,
  useLocation,
} from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Register from "./Register.jsx";
import Accueil from "./Accueil.jsx";
import "/css/style.css";

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
}

function App() {
  usePageViews();
  {
    if (window.location.pathname === "/") {
      return (
        <div>
          <Link to="/home">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/register">Register</Link>
          <Switch>
            <Route exact path="/about">
              <About show="/about" />
            </Route>
            <Route exact path="/home">
              <Home show="/home" />
            </Route>
            <Route exact path="/register">
              <Register show="/register" />
            </Route>
          </Switch>
        </div>
      );
    } else {
      return (
        <div>
          <div className="hide">
            <Link to="/home">Home</Link>
            <br />
            <Link to="/about">About</Link>
            <br />
            <Link to="/register">Register</Link>
          </div>
          <Switch>
            <Route exact path="/about">
              <About show="/about" />
            </Route>
            <Route exact path="/accueil">
              <Accueil show="/accueil" />
            </Route>
            <Route exact path="/home">
              <Home show="/home" />
            </Route>
            <Route exact path="/register">
              <Register show="/register" />
            </Route>
          </Switch>
        </div>
      );
    }
  }
}
render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
