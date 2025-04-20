import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <div className="container">
      <h1>There's {text.length} characters in this text.</h1>

      <textarea
        rows={20}
        cols={90}
        placeholder="Enter text here..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
