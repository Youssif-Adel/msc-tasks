import style from "./App.module.css";
import TimerCircle from "./components/TimerCircle/TimerCircle.jsx";
import { useEffect, useRef, useState } from "react";
import TimerControls from "./components/TimerControls/TimerControls.jsx";

function App() {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (isPaused) return;

    if (time <= 0) {
      setIsPaused(true);
      return;
    }

    function handleInterval() {
      setTime((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }

    const interval = setInterval(handleInterval, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, setTime]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  return (
    <div className={style.timerContainer}>
      <TimerCircle
        remainingTime={time}
        initialTime={initialTime}
        setInitialTime={setInitialTime}
        isPaused={isPaused}
      />

      <TimerControls
        setTime={setTime}
        initialTime={initialTime}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
    </div>
  );
}

export default App;
