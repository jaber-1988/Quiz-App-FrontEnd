import React from "react";
import { useState, useEffect } from "react";
import defaultQuestion from "../question.json"


export default function Quiz() {

  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(null);


  useEffect(() => {
    if (selectedAnswer > -1) {
      setIsCorrect(
        selectedAnswer === defaultQuestion[currentQuesIndex].correct
      );
    } else {
      setIsCorrect(null)
    }
  }, [currentQuesIndex, selectedAnswer]);
    




  const nextQuestion = () => {
    setSelectedAnswer(-1)
    setIsCorrect(null)
    setCurrentQuesIndex(currentQuesIndex + 1);
  };



  const previousQuestion = () => {
    setCurrentQuesIndex(currentQuesIndex - 1);
  };
  const onChangeAnswer = (index) => {
    setSelectedAnswer(index)
  };


/*  const isCorrect= selectedAnswer === defaultQuestion[currentQuesIndex].correct;
  console.log(isCorrect)
  */

  return (
    <div
      className={`questionBox ${ isCorrect!== null ? 
        isCorrect ? "questionCorrect" : "questionIncorrect" :""
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



















