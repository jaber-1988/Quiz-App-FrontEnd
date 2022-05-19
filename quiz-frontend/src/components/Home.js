import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <button>
        <Link to="/quiz">Start Quiz</Link>
      </button>
    </div>
  );
}

