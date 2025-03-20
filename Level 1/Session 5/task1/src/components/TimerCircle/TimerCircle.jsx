import style from "./TimerCircle.module.css";
import TimerCanvas from "./TimerCanvas.jsx";
import formatTime from "../../utils/formatTime.js";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function TimerCircle({ remainingTime, initialTime, setInitialTime, isPaused }) {
  const [hours, minutes, seconds] = formatTime(remainingTime);

  function handleClick(timeIncrease) {
    const newTime = initialTime + timeIncrease;
    setInitialTime(newTime > 0 ? newTime : 0);
  }

  return (
    <div className={style.timerCircle}>
      <TimerCanvas percentage={(remainingTime / initialTime) * 100} />

      <div className={style.outerCircle}>
        {isPaused && (
          <div className={style.timeControls}>
            <FaCaretUp onClick={() => handleClick(60 * 60)} />
            <FaCaretUp onClick={() => handleClick(60)} />
            <FaCaretUp onClick={() => handleClick(1)} />
          </div>
        )}

        <p className={style.timerText}>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>

        {isPaused && (
          <div className={style.timeControls}>
            <FaCaretDown onClick={() => handleClick(-60 * 60)} />
            <FaCaretDown onClick={() => handleClick(-60)} />
            <FaCaretDown onClick={() => handleClick(-1)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TimerCircle;
