import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Result() {
  const { state: result } = useLocation();

  return (
    <div className="questionBox">
      <h2>Your Score:</h2>
      <ul>
        <li>Correct Answer : {result.correctAnswer}</li>
        <li>Incorrect Answer : {result.inCorrectAnswer}</li>
        <li>Without Answer : {result.withoutAnswer}</li>
      </ul>

      <button>
        <Link to="/quiz">Try again</Link>
      </button>
    </div>
  );
}
