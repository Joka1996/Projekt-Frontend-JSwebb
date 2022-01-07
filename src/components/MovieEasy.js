import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Footer from "./Footer";

function GetMovies() {
  //useState för att skriva ut innehåll. samt sätta och skriva ut vilken fråga man befinner sig på.
  const [items, setItems] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
  //state för att kunna ändra till "poäng-kortet" som visas i slutet. samt räkna poäng.
  const [showScore, setShowScore] = useState(false);
  const [countScore, setScore] = useState(0);
  //nästa fråga, räkna poäng sker här
  const HandleAnswerButtonClick = (is_correct) => {
    if (is_correct === true) {
      setScore(countScore + 1);
    }

    //för att gå vidare bland frågorna. om nästa fråga är större än items(alltså sista frågan) visas kortet om poäng.
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < items.length) {
      setCurrentQuestion(nextQuestion);
      //console.log(nextQuestion, items.length);
    } else {
      //ändra till true så att poäng visas.
      setShowScore(true);
    }
    setCurrentQuestion(nextQuestion);
  };
  // varabel med den aktiva frågan från items.options[]
  const activeQuestion = items[currentQuestion];
  //  console.log(activeQuestion.description);

  /********JSX**********/
  return (
    <div className="App">
      <div className="container">
        {/**Om showscore är sant, då visas poängen, annars frågora. */}
        {showScore ? (
          <div className="scoreCard">
            <h2>
              you scored {countScore} out of {items.length}!
            </h2>
            <iframe
              src="https://giphy.com/embed/AwcmOV28QPnck"
              title="gif"
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/fireworks-firework-fire-works-AwcmOV28QPnck">
                via GIPHY
              </a>
            </p>
            <div className="GoBack">
              <button>
                <Link to={`/movies`}>To Movies</Link>
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1>Quiza</h1>
            <div>
              {/* en guard om den är undefiend */}
              <h2>{activeQuestion && activeQuestion.description}</h2>
              <span>Question nr {currentQuestion + 1}</span>
            </div>
            <div className="Desc_pics"></div>
            <div className="Answer_btn">
              {activeQuestion &&
                activeQuestion.options.map((c) => (
                  <button
                    onClick={() => HandleAnswerButtonClick(c.is_correct)}
                    value={c.is_correct}
                    key={c.text}
                  >
                    {c.text}
                  </button>
                ))}
            </div>
            {/* if-sats, om bild finns till frågan visas den, annars en css-class med display none */}
            <div className="Q_pics">
              {activeQuestion &&
                activeQuestion.options.map((c) =>
                  !c.image ? (
                    <p className="Display_none">empty</p>
                  ) : (
                    <img src={c.image} alt={c.text}></img>
                  )
                )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GetMovies;
