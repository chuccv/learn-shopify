import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

function App() {
  // useState example
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // useRef example
  const inputRef = useRef(null);

  // useEffect example
  useEffect(() => {
    console.log("Component mounted or updated");

    return () => {
      console.log("Cleanup on unmount or dependency change");
    };
  }, [count]); // Dependency array ensures this effect runs only when 'count' changes

  // useMemo example
  const computedValue = useMemo(() => {
    console.log("Computing expensive value...");
    return count * 2;
  }, [count]);

  // useCallback example
  const handleButtonClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Empty array ensures the function reference remains stable

  // Helper function to focus input
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
      <div>
        <h1>React Lifecycle and Hooks</h1>

        {/* useState example */}
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>

        {/* useRef example */}
        <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button onClick={focusInput}>Focus Input</button>

        {/* useMemo example */}
        <p>Computed Value (count * 2): {computedValue}</p>

        {/* useCallback example */}
        <button onClick={handleButtonClick}>Log Message</button>
      </div>
  );
}

export default App;
