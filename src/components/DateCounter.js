import { useReducer } from "react";

const initialState = { count: 0, step: 1 }; // Initial state for both states

// Reducer function that takes the current state and the action, then returns a the new state
function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  // useReducer for Count and Step states
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state; // Destructuring state

  /* Setting and resetting the date */
  const date = new Date("june 21 2027"); // This mutates the date object.
  date.setDate(date.getDate() + count); // Sets the new date on each re-render

  /* FUNCTIONS */
  // Decrease by step
  const dec = () => {
    dispatch({ type: "dec", payload: step });
  };

  // Increase by step
  const inc = () => {
    dispatch({ type: "inc", payload: step });
  };

  // Changing value of count manually (will get added to date on re-render)
  const defineCount = (e) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  // Changing the value of step (will get added after clicking "+" or "-")
  const defineStep = (e) => {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  // Resetting the fields
  const reset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
