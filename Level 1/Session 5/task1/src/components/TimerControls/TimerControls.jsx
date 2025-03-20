import style from "./TimerControls.module.css";
import Button from "../Button/Button.jsx";
import { FaPlay, FaRedo, FaPause } from "react-icons/fa";

function TimerControls({ setTime, initialTime, isPaused, setIsPaused }) {
  function handlePlay() {
    setIsPaused((prevState) => !prevState);
  }

  function handleReset() {
    setTime(initialTime);
    setIsPaused(true);
  }

  return (
    <div className={style.container}>
      <Button onClick={handlePlay}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </Button>

      <Button onClick={handleReset}>
        <FaRedo />
      </Button>
    </div>
  );
}

export default TimerControls;
