import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Result() {
  const { state: result } = useLocation();


  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  function quizRating() {
    swalWithBootstrapButtons
      .fire({
        title: "<strong>Were you satisfied with this quiz?</u></strong>",
  /*       text: "Plese rate us!", */
        icon: "info",
        showCancelButton: true,
        confirmButtonText:
          '<img src="images/thumbsUp.svg" alt="thumbsUp" /> Great!',
        cancelButtonText:
          '<img src="images/thumbsDown.svg" alt="thumbsDown" />',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            " <span><strong>That's our pleasure!</strong></span>",
            '<span><img src="images/ImHappy.svg" alt="ImHappy" /></span>',
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "<strong>Oh we're really sorry!</u></strong>",
            '<span><img src="images/ImSad.svg" alt="ImSad" /></span>',
            "error"
          );
        }
      });
  }

  return (
    <div className="questionBox">
      <h2>Your Score:</h2>

      <div className="score-box">
        <p>Correct Answer : {result.correctAnswer}</p>
        <p>Incorrect Answer : {result.inCorrectAnswer}</p>
        <p>Without Answer : {result.withoutAnswer}</p>
      </div>

      <button>
        <Link to="/quiz">Try again</Link>
      </button>
      <button onClick={quizRating}>Rate quiz!</button>
    </div>
  );
}
