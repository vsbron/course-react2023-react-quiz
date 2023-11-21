import { useQuiz } from "../context/QuizContext";

import Options from "./Options";

function Question() {
  // Getting the state from Context API
  const { questions, index } = useQuiz();

  // Getting the question for this step
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
