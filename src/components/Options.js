import { useQuiz } from "../context/QuizContext";

function Options() {
  // Getting the state from Context API
  const { questions, index, dispatch, answer } = useQuiz();

  // Getting the question for this step
  const question = questions[index];

  // Boolean variable that indicates whether the answer was given by player
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        // Conditional rendering of a class
        // If option was clicked by player it gets the "answer" class and option moves to the right
        // Also, if answer was given, the correct option gets "correct" class (blue bg), and the rest get "wrong" class (orange bg)
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered} // Disables all option buttons once answer is recorded
          // Click handler function that sets the answer given by player by dispatching the option index
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
