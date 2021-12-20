import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";

function Question() {
  //för att hämta id-nummer.
  let { id } = useParams();
  //console.log(id);

  //kalla på fetchItem
  useEffect(() => {
    getMovie();
  }, []);

  //hämta enskild
  const [item, setItem] = useState([]);

  const getMovie = async () => {
    const fetchItem = await fetch(`http://localhost:5000/api/movies/id=${id}`);

    const item = await fetchItem.json();
    setItem(item);
    console.log(item);
    // test
    for (let i = 0; i < item.options.length; i++) {
      console.log(item.options[i]);
    }
  };

  //hämta, map för att det är array
  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Question: {item.description}</h2>
      {item.options.map((c) => (
        <button key={c.text}>{c.text}</button>
      ))}
    </div>
  );
}

export default Question;
/*    */
