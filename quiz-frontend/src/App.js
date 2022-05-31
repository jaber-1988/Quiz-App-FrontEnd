import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { Route, Routes } from "react-router";
/* import { GiTrophyCup } from "react-icons/gi"; */

function App() {

  return (
    <div className="App">
      <h1>
        Quiz <img src="images/images.png" alt="adamak" />
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
