import { createContext, useContext, useEffect, useReducer } from "react";

// Creating the context
const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

// Initial state values for the reducer
const initialState = {
  questions: [],
  status: "loading", // Can also be "error", "ready", "active" and "finished"
  index: 0, // Question index
  answer: null, // Selected answer
  points: 0, // Current points
  highscore: 0, // Hi-score of the game
  secondsRemaining: null, // The time limit for the game
};

// The reducer function
function reducer(state, action) {
  switch (action.type) {
    // Ready status, when question packs were received
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    // Error status, when fetching went wrong
    case "dataFailed":
      return { ...state, status: "error" };

    // Active status, when Quiz has started, the amount of seconds remaining is calculated
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    // New answer has been submited
    case "newAnswer":
      // Getting the current question objects to get the points it awards
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload, // Index of selected answer
        // Calculating points the player should get if answered right
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    // Moving to the next question (increasing index by one, putting answer to null)
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    // Finish screen
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    // Restart quiz
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      };

    // Moving to the next question (increasing index by one, putting answer to null)
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        // When the seconds timer reaches 0, game ends
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  // Initializing reducer and destructuring the state
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Getting the amount of questions
  const numQuestions = questions.length;

  // Getting the amount of all possible points
  const maxPossiblePoints = questions.reduce((a, c) => (a += c.points), 0);

  // useEffect hook that runs on initial render and gets the questions pack
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        if (Object.keys(data).length === 0) throw new Error(); // Guard clause

        // Dispatching to the reducer if data is received (Status: ready)
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        // Dispatching to the reducer if data wasn't received (Status: error)
        dispatch({ type: "dataFailed" });
      }
    }

    // Calling the async function
    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  // Getting the state from useContext hook
  const context = useContext(QuizContext);

  // Guard clause
  if (context === undefined)
    throw new Error("QuizContext was used outside of its scope");

  return context;
}

export { QuizProvider, useQuiz };
