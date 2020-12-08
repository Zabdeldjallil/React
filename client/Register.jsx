import React, { useState } from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");
import { useForm } from "react-hook-form";
import "/css/style.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";

export default function Register({ show }) {
  const [err, setErr] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(JSON.stringify(data));
    fetch("http://localhost:8080/register", requestOptions)
      .then((response) => response.json())
      .then((toto) => {
        if (toto.message === "working!") window.location.href = toto.link;
        else setErr(toto.message);
      });
  };
  if (show == "/register") {
    return (
      <>
        <div className="flex-big">
          {err}
          <div className="back">
            <form
              action="/register"
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
              <button type="submit">Signup</button>
            </form>
          </div>
        </div>
      </>
    );
  } else return "";
}
