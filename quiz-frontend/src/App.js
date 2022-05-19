import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { Route, Routes } from "react-router";

function App() {

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
