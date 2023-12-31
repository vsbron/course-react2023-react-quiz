import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  // Getting the state from Context API
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>

      {/* Button that starts the quiz by dispatching the Active status */}
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
