import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

function Question() {
  //för att hämta id-nummer.
  let { id } = useParams();
  //console.log(id);

  //kalla på funktionerna
  useEffect(() => {
    getMovie();
    fetchItems();
  }, []);

  //hämta enskild options då den är tom
  const [item, setItem] = useState({ options: [] });
  //hämta alla
  const [items, setItems] = useState([]);

  const getMovie = async () => {
    const fetchItem = await fetch(
      `https://projekt-backend-jswebb.herokuapp.com/api/movies/id=${id}`
    );

    const item = await fetchItem.json();
    setItem(item);
    console.log(item);
  };

  // hämta alla för att skicka vidare användaren
  const fetchItems = async () => {
    const data = await fetch(
      "https://projekt-backend-jswebb.herokuapp.com/api/movies"
    );
    const items = await data.json();
    //test
    //console.log(items.description);
    setItems(items);
  };

  //Kolla om vald knapp stämmer och skicka meddelande
  const [score, setScore] = useState("");
  const checkAnswer = (is_correct) => {
    if (is_correct === true) {
      setScore(<p id="RightAnswer">Correct!</p>);
    } else {
      setScore(<p id="WrongAnswer">Wrong!</p>);
    }
  };

  //skriv ut, map för att det är array
  return (
    <div className="App">
      <div className="container">
        <h1>Quiz Movies</h1>
        <h2>{item.description}</h2>
        {/* if-sats, om bild finns till frågan visas den, annars en class med display none */}
        <div className="Desc_pics">
          {!item.image ? (
            <p className="Display_none">empty</p>
          ) : (
            <img src={item.image} alt={item.description}></img>
          )}
        </div>
        <div className="Answer_btn">
          {item.options.map((c) => (
            <button
              value={c.is_correct}
              key={c.text}
              onClick={() => checkAnswer(c.is_correct)}
            >
              {c.text}
            </button>
          ))}
        </div>
        <h3>Your answer were.....{score}</h3>
        {/* if-sats, om bild finns till frågan visas den, annars en class med display none */}
        <div className="Q_pics">
          {item.options.map((c) =>
            !c.image ? (
              <p className="Display_none">empty</p>
            ) : (
              <figure>
                <img src={c.image} alt={c.text} title={c.text}></img>
                <figcaption>{c.text}</figcaption>
              </figure>
            )
          )}
        </div>
        <div className="NextQuestion">
          <h4>More Question</h4>
          <div className="GoBack">
            <button>
              <Link to={`/movies`}>To Movies</Link>
            </button>
          </div>
          <ul>
            {items.map((c) => (
              <li>
                <Link to={`/movies/nextquestion/${c._id}`}>
                  {c.description.slice(0, 20)}...
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Question;
