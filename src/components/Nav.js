import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Nav() {
  return (
    //navigation med länkar till quiz-kategorier
    <nav>
      <h3>QUIZA</h3>
      <ul className="nav-links">
        <Link to="/">
          <li>Start</li>
        </Link>
        <Link to="/movies">
          <li>Movies</li>
        </Link>
        <Link to="/history">
          <li>History</li>
        </Link>
        <Link to="/login">
          <li>Login/logout </li>
        </Link>
        <Link to="/register">
          <li>Register </li>
        </Link>
        <Link to="/addquiz">
          <li>Add Quiz </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
