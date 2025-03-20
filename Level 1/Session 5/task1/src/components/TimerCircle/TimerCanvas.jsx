import style from "./TimerCircle.module.css";
import { useEffect, useRef } from "react";

function TimerCanvas({ percentage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) return;

    console.log(percentage);

    const ctx = canvasElement.getContext("2d");
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.strokeStyle = "#89ac46";
    ctx.beginPath();
    ctx.arc(
      canvasElement.width / 2,
      canvasElement.height / 2,
      canvasElement.width / 2,
      -Math.PI / 2,
      -Math.PI / 2 + 2 * Math.PI * (percentage / 100),
    );
    ctx.lineWidth = 50;
    ctx.stroke();
  }, [percentage]);

  return (
    <canvas
      className={style.timerCanvas}
      ref={canvasRef}
      width={400}
      height={400}
    ></canvas>
  );
}

export default TimerCanvas;
