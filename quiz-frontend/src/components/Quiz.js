import React from "react";
import { useState } from "react";
import defaultQuestion from "../question.json"

export default function Quiz() {
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(""); 

 
  const nextQuestion = () => {
    setCurrentQuesIndex(currentQuesIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuesIndex(currentQuesIndex - 1);
  };

  const onChangeAnswer = (index) => {
    setSelectedAnswer(index)
  };

  const isCorrect =
    selectedAnswer === defaultQuestion[currentQuesIndex].correct;

  return (
    <div
      className={`questionBox ${
        isCorrect ? "questionCorrect" : "questionIncorrect"
      }`}
    >
      <h2>{defaultQuestion[currentQuesIndex].Frage}</h2>
      <ul>
        {defaultQuestion[currentQuesIndex].antwort.map((item, index) => {
          return (
            <li>
              <input
                type="radio"
                name="radio"
                onChange={() => onChangeAnswer(index)}
              />
              {item}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={previousQuestion} disabled={currentQuesIndex === 0}>
          previous Question
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentQuesIndex === defaultQuestion.length - 1}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}
