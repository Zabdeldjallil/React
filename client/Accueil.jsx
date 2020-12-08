import React from "react";
import { render } from "react-dom";
require("babel-core/register");
require("babel-polyfill");

export default function Accueil({ show }) {
  if (show == "true") {
    return (
      <div className="grid-container">
        <div className="toto">
          <span>Name Lastname</span>
          <br />
          <br />
          <div className="content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio enim
            error numquam qui aspernatur iste officia laboriosam ea temporibus
            illum repellat culpa assumenda, quam impedit alias voluptatum.
            Fugiat, ad quibusdam.
          </div>
        </div>
      </div>
    );
  } else return "You need to login to see this page :D";
}
