import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Quiz() {
  const navigate = useNavigate();

  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(null);
  const [counter, setCounter] = useState(0)
  const [defaultQuestion, setDefaultQuestion] = useState([]);

  useEffect(() => {
    if (selectedAnswer > -1) {
      setIsCorrect(
        selectedAnswer === defaultQuestion[currentQuesIndex].correct
      );

    } else {
      setIsCorrect(null)
    }
  }, [currentQuesIndex, selectedAnswer]);

  useEffect(() => {
    if (isCorrect === true) { setCounter(counter + 5) }
  }, [isCorrect])





  useEffect(() => {
    axios.get("http://localhost:3010").then((res) => {
      console.log(res);
      setDefaultQuestion(res.data);
    });
  }, []);

  const nextQuestion = () => {
    setCurrentQuesIndex(currentQuesIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuesIndex(currentQuesIndex - 1);

  };
  const onChangeAnswer = (index) => {
    const newQuestionList = [...defaultQuestion];
    newQuestionList[currentQuesIndex].answer = index;
    setDefaultQuestion(newQuestionList);
  };

  const currentQuestion = defaultQuestion[currentQuesIndex];
  if (!currentQuestion) {
    return <p>loading....</p>;
  }

  // const isCorrect = currentQuestion.answer === currentQuestion.correct;

  const showResult = () => {
    const result = {
      correctAnswer: 0,
      inCorrectAnswer: 0,
      withoutAnswer: 0,
    };

    defaultQuestion.forEach((Question) => {
      if (Question.answer === undefined) {
        result.withoutAnswer++;
      }
      else if (Question.answer === Question.correct) {
        result.correctAnswer++;
      } else {
        result.inCorrectAnswer++;
      }
    });
    navigate("/result", {
      state: result
    })
  };

  return (
    <div
      className={`questionBox ${currentQuestion.answer !== undefined
          ? isCorrect
            ? "questionCorrect"
            : "questionIncorrect"
          : ""
        }`}
    >
      <h2>{currentQuestion.Frage}</h2>
      <ul>
        {currentQuestion.antwort.map((item, index) => {
          return (
            <li>
              <input
                type="radio"
                name="radio"
                onChange={() => onChangeAnswer(index)}
                checked={currentQuestion.answer === index}
              />
              {item}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={previousQuestion} disabled={currentQuesIndex === 0}>
          Previous Question
        </button>
        <button
          onClick={nextQuestion}
          disabled={currentQuesIndex === defaultQuestion.length - 1}
        >
          Next Question
        </button>
        <button onClick={showResult}>See your Score!</button>
      </div >
    </div >
  );
}

