import React from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");

export default function About({ show }) {
  if (show == "/about") {
    return <div>This is the fucking about</div>;
  } else return "";
}
