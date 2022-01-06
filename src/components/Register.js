import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import Footer from "./Footer";

function Register() {
  let navigate = useNavigate();
  // kolla om användaren är inloggad, är den det skicka till login, annars visa registrering
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      return navigate("/login");
    }
  });

  const [user_name, setUsernameReg] = useState("");
  const [password, setPasswordReg] = useState("");
  const [message, setMessage] = useState("");

  //hantera datan från formulär och skicka till databas
  const handlesubmit = async (e) => {
    e.preventDefault();
    const user = { user_name, password };
    await fetch(
      "https://projekt-backend-jswebb.herokuapp.com/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    ).then((res) => {
      //console.log("new user added");
      //console.log(user);
      if (res.status === 200) {
        returnMessage();
      }
      if (res.status === 406) {
        //console.log("no user created");
        inUse();
      }
      if (!(user.user_name && user.password)) {
        invalid();
      }
    });
  };
  // ett bekräftelsemeddelande
  const returnMessage = (user_name) => {
    setMessage(<h2> User {user_name} has been created!</h2>);
  };
  //användarnamnet finns redan
  const inUse = () => {
    setMessage(<h2>Username already in use.</h2>);
  };
  // om lösenord/användarnamn fattas fungerar ej, men skickar inga tomma strängar.
  const invalid = () => {
    setMessage(<h2>Username/password must be inserted.</h2>);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Create account</h1>
        <p>
          If you register you get the power to add new quizez! (which means that
          I dont need to do all the work hehe).
        </p>
        <div className="login-user">
          <form action="" onSubmit={handlesubmit}>
            <label htmlFor="">Username</label>
            <input
              type="text"
              onChange={(e) => setUsernameReg(e.target.value)}
              value={user_name}
              required
            />
            <label htmlFor="">Password:</label>
            <input
              type="password"
              onChange={(e) => setPasswordReg(e.target.value)}
              value={password}
              required
            />
            <button type="submit">Register</button>
          </form>
          <div className="message">{message}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
