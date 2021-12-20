import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
    //navigation med länkar till quiz-kategorier
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        <Link to="/home">
          <li>Start</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/movies">
          <li>Movies</li>
        </Link>
        <Link to="/history">
          <li>History</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
