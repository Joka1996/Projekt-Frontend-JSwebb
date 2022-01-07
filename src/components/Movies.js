import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function MovieSelection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(
      "https://projekt-backend-jswebb.herokuapp.com/api/movies"
    );
    const items = await data.json();
    //test
    //console.log(items.description);
    setItems(items);
  };

  //hämta, map för att det är array
  return (
    <div className="App">
      <div className="container">
        <h1>Quiza</h1>
        {items.slice(0, 1).map((item) => (
          <p>Category: {item.category}</p>
        ))}
        <div>
          <h2>
            <Link to={`/movieEasy/`}>PLAYYYY MEEEE</Link>
          </h2>
        </div>
        <p>These questions may vary in difficulty.</p>
        <h3>All the questions</h3>
        <div className="questionBox">
          {items.map((item) => (
            <h4>
              <Link to={`/movies/${item._id}`}>{item.description}</Link>
            </h4>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieSelection;
