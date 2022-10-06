import { useEffect, useState } from "react";
import "./styles.css";

/* 
TODO:

1) Fix relaod so that component reloads not page
2) fix variable names

*/

export default function App() {
  const [color, setColor] = useState("");
  const [wrongColor, setWrongColor] = useState("");
  const [answer, setAnswer] = useState("");
  const [colorsAnswers, setColorsAnswers] = useState([]);

  // Color options array
  const colorValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ];

  // Color picker
  const actualColor = () => {
    return colorValues
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .toString()
      .replaceAll(",", "")
      .replaceAll('"', "");
  };

  // Assign colors
  const assignColors = () => {
    const correctColor = actualColor();
    const incorrectColor = actualColor();
    setColor(correctColor);
    setWrongColor(incorrectColor);
    setColorsAnswers(
      [correctColor, incorrectColor].sort(() => 0.5 - Math.random())
    );
  };

  useEffect(() => {
    assignColors();
  }, []);

  // Handle click function for buttons name value
  const handleInput = (e) => {
    const buttonValue = e.target.name;
    setAnswer(buttonValue);
    console.log(buttonValue);
  };

  // Refreshes page after correct answer is picked
  function refreshPage() {
    setTimeout(window.location.reload.bind(window.location), 1200);
  }

  // Once a button is clicked and state is updated, display correct element & refreshes page
  const buttonLogic = () => {
    console.log("answer: ", answer);
    if (answer === "") {
      return <p>{""}</p>;
    } else if (answer === color) {
      refreshPage();
      return <p style={{ color: "green" }}>Correct!</p>;
    } else {
      return <p style={{ color: "red" }}>Incorect...</p>;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <p className="pickerAnswer">pick a color</p>
        <div
          className="colorBox"
          style={{ backgroundColor: `#${color}` }}
        ></div>
        <div className="buttonContainer">
          {colorsAnswers.map((color) => {
            return (
              <>
                <button
                  onClick={handleInput}
                  name={color}
                  className="buttons"
                  key={color}
                >
                  #{color}
                </button>
              </>
            );
          })}
        </div>
        <div className="pickerAnswer">{buttonLogic()}</div>
      </div>
    </div>
  );
}
