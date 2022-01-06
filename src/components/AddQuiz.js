import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";

function AddnewQuiz() {
  const [user, setUser] = useState();
  let navigate = useNavigate();
  // kolla om användaren är inloggad
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      return navigate("/login");
    }
  }, []);

  //useState
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [text, setText] = useState();
  const [text2, setText2] = useState();
  const [text3, setText3] = useState();
  const [text4, setText4] = useState();
  const [is_correct, setIs_correct] = useState();
  const [is_correct2, setIs_correct2] = useState();
  const [is_correct3, setIs_correct3] = useState();
  const [is_correct4, setIs_correct4] = useState();

  //FETCH för att lägga till
  const addForm = async (e) => {
    e.preventDefault();
    // gör om is_correct till boolen true.
    const isTrue = is_correct === "true";
    const isTrue2 = is_correct2 === "true";
    const isTrue3 = is_correct3 === "true";
    const isTrue4 = is_correct4 === "true";

    const addQuiz = {
      category: category,
      description: description,
      options: [
        { text: text, is_correct: isTrue },
        { text: text2, is_correct: isTrue2 },
        { text: text3, is_correct: isTrue3 },
        { text: text4, is_correct: isTrue4 },
      ],
    };
    await fetch("https://projekt-backend-jswebb.herokuapp.com/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addQuiz),
    }).then(() => {
      console.log("new quiz added");
      /* console.log(addQuiz);
      console.log(isTrue);*/
      //nollställ formulär med set...
      setCategory("");
      setDescription("");
      setText("");
      setText2("");
      setText3("");
      setText4("");
      setIs_correct("");
      setIs_correct2("");
      setIs_correct3("");
      setIs_correct4("");
    });
  };
  //meddelande om det läggs till
  const [message, setMessage] = useState("");
  const displayMessage = (description) => {
    if (!description === "") {
      setMessage(
        <h3 id="WrongAnswer">Fields in the form can not be left empty</h3>
      );
    } else {
      setMessage(
        <h3 id="RightAnswer">Question : {description} has been added</h3>
      );
    }
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Add new quiz</h1>
        <h3>
          {" "}
          Feel free to add new questions to this quiz-page. But keep it clean
          and family friendly! Remember, with great power comes great
          responsibility. <br /> BAD questions will be deleted.
        </h3>
        <h4>Instructions:</h4>
        <p>
          This form adds a new <b>FILM</b> question. One and only one of the
          options can be true, Category should always be "Film". <br /> Do not
          leave any of the "Option" fields empty.
        </p>
        {message}
        <div className="addQuestion">
          <form onSubmit={addForm}>
            <label htmlFor="">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Film"
            />
            <label> Question</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="option1">
              Option1
              <input
                name="option1"
                type="text"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>

            <label htmlFor="">
              True/false?
              <input
                required
                type="text"
                value={is_correct}
                onChange={(e) => setIs_correct(e.target.value)}
              />
            </label>
            <label htmlFor="option2">
              Option2
              <input
                name="option2"
                type="text"
                required
                value={text2}
                onChange={(e) => setText2(e.target.value)}
              />
            </label>

            <label htmlFor="">
              True/false?
              <input
                required
                type="text"
                value={is_correct2}
                onChange={(e) => setIs_correct2(e.target.value)}
              />
            </label>
            {/*** */}
            <label htmlFor="option3">
              Option3
              <input
                required
                name="option3"
                type="text"
                value={text3}
                onChange={(e) => setText3(e.target.value)}
              />
            </label>

            <label htmlFor="">
              True/false?
              <input
                required
                type="text"
                value={is_correct3}
                onChange={(e) => setIs_correct3(e.target.value)}
              />
            </label>
            {/*** */}
            <label htmlFor="option4">
              Option4{" "}
              <input
                name="option4"
                type="text"
                required
                value={text4}
                onChange={(e) => setText4(e.target.value)}
              />
            </label>

            <label htmlFor="">
              True/false?
              <input
                required
                type="text"
                value={is_correct4}
                onChange={(e) => setIs_correct4(e.target.value)}
              />
            </label>
            <button type="sumbit" onClick={() => displayMessage(description)}>
              Add new quiz
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddnewQuiz;
