import { useEffect, useReducer } from "react";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Question from "./Question";
import StartScreen from "./StartScreen";

// Initial state values
const initialState = {
  questions: [],
  status: "loading", // Can also be "error", "ready", "active" and "finished"
  index: 0, // Question index
  answer: null, // Selected answer
  points: 0, // Current points
};

// The reducer function
function reducer(state, action) {
  switch (action.type) {
    // Ready status, when question packs were received
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    // Error status, when fetching went wrong
    case "dataFailed":
      return { ...state, status: "error" };
    // Active status, when Quiz has started
    case "start":
      return { ...state, status: "active" };

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
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  // Initializing reducer and destructuring the state
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Getting the amount of questions
  const numQuestions = questions.length;

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
    <div className="app">
      <Header />
      <Main>
        {/* Conditional rendering */}

        {/* Loading message if data is initially loading */}
        {status === "loading" && <Loader />}

        {/* Error message if something went wrong */}
        {status === "error" && <Error />}

        {/* Start screen if questions were loaded */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}

        {/* Display question if the game has started */}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
