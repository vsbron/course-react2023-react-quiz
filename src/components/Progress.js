import { useQuiz } from "../context/QuizContext";

function Progress() {
  // Getting the state from Context API
  const { index, numQuestions, points, maxPossiblePoints } = useQuiz();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + 1} />
      {/* <progress max={numQuestions} value={index + Number(answer !== null)} /> */}

      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;
