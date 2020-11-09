import React from "react";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

const Homepage = () => {
  const [boardState, setBoardState] = useState({
    nRow: 10,
    nCol: 10,
    currentBoard: {},
    lastAlive: {},
    liveCells: 0,
  });

  const [redirectGame, setRedirectGame] = useState(false);
  const [redirectRule, setRedirectRule] = useState(false);

  const setNumRow = (e) => {
    const val = e.target.value;
    setBoardState((state) => ({ ...state, nRow: val }));
  };
  const setNumColumn = (e) => {
    const val = e.target.value;
    setBoardState((state) => ({ ...state, nCol: val }));
  };

  const checkInput = () => {
    const inputRow = boardState.nRow;
    const inputCol = boardState.nCol;
    let msg;
    if (inputRow < 10 || inputRow > 100 || inputCol < 10 || inputCol > 100) {
      msg = "Input is invalid. Please enter integer between 10 and 1000.";
    } else {
      msg = "Nice input";
      setRedirectGame(true);
    }
    document.getElementById("msg").innerHTML = msg;
  };

  if (redirectGame) {
    return <Redirect to={{ pathname: "/game" }} />;
  }

  return (
    <div className="homepage">
      <h1>Welcome to Conway’s History of Life</h1>
      <p>
        <h3>Number of Rows you want to create</h3>
        <input
          type="number"
          name="row"
          placeholder="enter an integer from 10 to 100"
          onChange={(e) => setNumRow(e)}
        />
        <h3>Number of Columns you want to create</h3>
        <input
          type="number"
          name="column"
          placeholder="enter an integer from 10 to 100"
          onChange={(e) => setNumColumn(e)}
        />
        <br />
        <br />
        <input
          type="button"
          value="Submit"
          onClick={() => {
            checkInput();
          }}
        />
        <p id="msg"></p>
      </p>
    </div>
  );
};

export default Homepage;
