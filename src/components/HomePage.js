import React from "react";
import Footer from "./Footer";
function Home() {
  return (
    <div className="App">
      <div className="container">
        <h1>Hello there</h1>
        <p>
          This is a quiz-site. If you create an account you will be able to
          contribute with more questions. For now users can only add
          text-question.
          <br />
          More subjects and user features might be a thing in the future.
        </p>
        <p>This was made as a project for learning React.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
