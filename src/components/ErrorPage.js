import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Error() {
  return (
    <div className="App">
      <div className="container">
        <h1>ERROR 404 NOT FOUND</h1>
        <h2>
          Wanna go back to <Link to="./">start?</Link>
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
