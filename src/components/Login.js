import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import "../App.css";
import Footer from "./Footer";

function Login() {
  let navigate = useNavigate();
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();

  // kolla om använadere är inloggad annars skicka starta logga in.
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      loginUser();
    }
  }, []);

  // logga ut användare, ta bort ur local storage och töm useState()
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    window.alert("User logged out");
    return navigate("/login");
  };

  //logga in användare + felmeddelanden
  const loginUser = async (e) => {
    e.preventDefault();
    const user = { user_name, password };
    await fetch("https://projekt-backend-jswebb.herokuapp.com/api/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => {
      // beroende på status-kod startas olika funktioner. status-koderna är från backend.
      if (res.status === 200) {
        console.log("logged in");
        displayMessage(user_name);
        //spara till localstorage så att man kan bläddra mellan sidor utan att man blir utloggad
        setUser(user.user_name);
        localStorage.setItem("user", JSON.stringify(user.user_name));
      }

      if (res.status === 400) {
        wrongPassword();
        console.log("wrong");
      }
      if (res.status === 401) {
        missingUser();
        console.log("missing user");
      }
    });
  };
  //meddelande för inloggning
  const displayMessage = (user_name) => {
    setMessage(<h2> User: {user_name} has been logged in!</h2>);
  };
  // fel lösenord
  const wrongPassword = () => {
    setMessage(<h2> Invalid password/username</h2>);
  };
  // användare finns ej
  const missingUser = () => {
    setMessage(
      <h2>
        This user cannot be found, want to create an{" "}
        <Link to="/register">account?</Link>
      </h2>
    );
  };
  // om användaren redan är inloggad, visa då meddelande och en logga ut-knapp
  if (user) {
    return (
      <div className="App">
        <div className="container">
          <div className="logOut">
            <div className="message">{message}</div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Login</h1>
        <div className="login-user">
          <form action="" onSubmit={loginUser}>
            <label htmlFor=""> Username</label>
            <input
              type="text"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              name=""
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
          <div className="message">{message}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
