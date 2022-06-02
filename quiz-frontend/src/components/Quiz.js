import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import mojs from "@mojs/core";

const TIMER = 10;

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuesIndex, setCurrentQuesIndex] = useState(0);
  const [defaultQuestion, setDefaultQuestion] = useState([]);
  const [timer, setTimer] = useState(TIMER);

    const showResult = () => {
      const result = {
        correctAnswer: 0,
        inCorrectAnswer: 0,
        withoutAnswer: 0,
      };

      defaultQuestion.forEach((Question) => {
        if (Question.answer === undefined) {
          result.withoutAnswer++;
        } else if (Question.answer === Question.correct) {
          result.correctAnswer++;
        } else {
          result.inCorrectAnswer++;
        }
      });

      navigate("/result", {
        state: result,
      });
    };


  useEffect(() => {
   setTimer(TIMER)
   const intervalId = setInterval(() => {
     setTimer((timer) => {
       if (timer === 0) {
         nextQuestion();
         return TIMER;
       } else return timer - 1;
     });
   }, 1000);
   if (currentQuesIndex === defaultQuestion.length && defaultQuestion.length > 0) {
     showResult();
   }
   return () => {
     clearInterval(intervalId);
   };
 }, [currentQuesIndex])


  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST).then((res) => {
      console.log(res);
      setDefaultQuestion(res.data);
    });
  }, []);

  const nextQuestion = () => {
    setCurrentQuesIndex(index => index + 1);
   
  };

  const previousQuestion = () => {
    setCurrentQuesIndex(index=>index - 1);
  };

  const onChangeAnswer = (index) => {
    const newQuestionList = [...defaultQuestion];
    newQuestionList[currentQuesIndex].answer = index;
    setDefaultQuestion(newQuestionList);

    if (newQuestionList[currentQuesIndex].correct === index) {
      const burst = new mojs.Burst({
        radius: { 0: 100 },
        count: 10,
        children: {
          shape: "polygon",
          points: 5,
          fill: { red: "orange" },
          rotate: { 360: 0 },
          duration: 2000,
          delay: "stagger( rand(0, 200) )",
        },
      });
      burst.replay();
      const audio = new Audio("sound1.mp3");
      audio.play()

    } else {
       const audio = new Audio("error-sound.mp3");
       audio.play();
      
    }
  
  };

  const currentQuestion = defaultQuestion[currentQuesIndex];
  if (!currentQuestion) {
    return <p>loading....</p>;
  }

  const isCorrect = currentQuestion.answer === currentQuestion.correct;

  console.log(currentQuestion.answer , currentQuestion.correct);
  return (
    <div className="questionBox">
      <div className="time">
        <span>{timer}</span>
      </div>
      <h2 className="frage"> {currentQuestion.Frage}</h2>
      <div className="answer-box">
        {currentQuestion.antwort.map((item, index) => {
          return (
            <p className={`answers ${
                currentQuestion.answer !== undefined &&
                index === currentQuestion.answer
                  ? isCorrect
                    ? "questionCorrect"
                    : "questionIncorrect"
                  : ""
              }`}
              onClick={() => onChangeAnswer(index)}
              checked={currentQuestion.answer === index}
            >
              {item}
            </p>
          );
        })}
      </div>
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
      </div>
    </div>
  );
}
