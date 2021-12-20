import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function GetMovies() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("http://localhost:5000/api/movies");
    const items = await data.json();
    console.log(items);
    setItems(items);
  };
  return (
    <div className="App">
      <h1>Quiza</h1>
      {items.map((item) => (
        <h2>
          <Link to={`/movies/${item._id}`}>{item.description}</Link>
        </h2>
      ))}
    </div>
  );
}

export default GetMovies;
