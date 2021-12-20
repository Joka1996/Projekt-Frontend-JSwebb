import React from "react";
import "./App.css";
import Movies from "./components/Movies.js";
import Nav from "./components/Nav.js";
import History from "./components/History.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About.js";
import Question from "./components/Question.js";

function App() {
  return (
    // routes för undersidor/kategorier.
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/history" element={<History />} />
          <Route path="movies/:id" element={<Question />} />
          <Route path="history/:id" element={<Question />} />
        </Routes>
      </div>
    </Router>
  );
}

//homepage
const Home = () => {
  <div>
    <h1>Välkommen</h1>
  </div>;
};

export default App;
