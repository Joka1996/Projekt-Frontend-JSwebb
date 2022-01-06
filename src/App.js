import React from "react";
import "./App.css";
import Movies from "./components/Movies.js";
import Nav from "./components/Nav.js";
import History from "./components/History.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question from "./components/Question.js";
import MovieEasy from "./components/MovieEasy.js";
import NextQuestion from "./components/NextQuestion";
import Login from "./components/Login";
import Register from "./components/Register";
import Addquiz from "./components/AddQuiz";
import Home from "./components/HomePage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    // routes för undersidor/kategorier. path=* är en errorPage om 404.
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addQuiz" element={<Addquiz />} />
          <Route path="/movieEasy" element={<MovieEasy />} />
          <Route path="movies/:id" element={<Question />} />
          <Route path="movies/nextquestion/:id" element={<NextQuestion />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
