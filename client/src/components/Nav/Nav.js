import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/home">Home</Link>
        <Link className="navbar-brand" to="/saved">Saved</Link>
      </div>
    </div>
  </nav>;

export default Nav;
