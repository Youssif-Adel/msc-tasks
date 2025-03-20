import style from "./Button.module.css";

function Button({ children, ...rest }) {
  return (
    <button {...rest} className={style.btn}>
      {children}
    </button>
  );
}

export default Button;
