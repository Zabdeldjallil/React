import React, { useState } from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");
import { useForm } from "react-hook-form";
import "/css/style.css";
import "./Accueil";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import Accueil from "./Accueil";

export default function Home({ show }) {
  const [err, setErr] = useState("");
  const [connected, setConnect] = useState(false);
  const [user, setUser] = useState({});
  const { register, handleSubmit, watch, errors } = useForm();
  document.querySelector("title").innerHTML = "Index";
  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      allowed_headers: "Content-Type,Authorization",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/connection", requestOptions)
      .then((response) => response.json())
      .then((toto) => {
        if (toto.message === "working!") {
          setConnect(true);
          setUser(toto.connected);
        } else setErr(toto.message);
      });
  };
  {
    if (show == "/home" && !connected) {
      return (
        <>
          <h1>Home Page</h1>
          {err}
          <div className="flex-big">
            <div className="back">
              <form
                action="/connection"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={register({ required: true })}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={register({ required: true })}
                />
                <button type="submit">Connect</button>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      if (show == "/home" && connected) {
        return <Accueil show="true" />;
      }
    }
  }
}
