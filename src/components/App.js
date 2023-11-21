import Error from "./Error";
import Header from "./Header";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

import { useQuiz } from "../context/QuizContext";

export default function App() {
  // Getting the state from Context API
  const { status } = useQuiz();

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
        {status === "ready" && <StartScreen />}

        {/* Display question if the game has started */}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {/* Start screen if questions were loaded */}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
