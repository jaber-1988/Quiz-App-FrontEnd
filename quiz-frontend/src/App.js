
import './App.css';
import { useState } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";


function App() {
  const [gameState, setGameState] = useState("home");

  return (
    <div className="App">
      <h1>Quiz App</h1>

      {gameState === "home" && <Home />}
      {gameState === "quiz" && <Quiz />}
    </div>
  );
}

export default App;
