import React from "react";
import "./styles.css";
import logo from "./dna.png";
import { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { BoardContext } from "../BoardContext";

const Homepage = () => {
  const [boardState, setBoardState] = useContext(BoardContext);
  const [redirectGame, setRedirectGame] = useState(false);

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
      <nav>
        <img className="logo" src={logo} />
        <ul>
          <Link to="/">
            <li>
              <a className="onPage">Home</a>
            </li>
          </Link>
          <Link to="/rules">
            <li>
              <a>Rules</a>
            </li>
          </Link>
        </ul>
      </nav>
      <div className="center">
        <h1>Welcome to Conway’s Game of Life</h1>
        <p>
          <h3>Number of Rows you want to create</h3>
          <input
            className="selectNums"
            type="number"
            name="row"
            placeholder="Enter an integer from 10 to 100"
            onChange={(e) => setNumRow(e)}
          />
          <h3>Number of Columns you want to create</h3>
          <input
            className="selectNums"
            type="number"
            name="column"
            placeholder="Enter an integer from 10 to 100"
            onChange={(e) => setNumColumn(e)}
          />
          <input
            className="submit"
            type="button"
            value="Submit"
            onClick={() => {
              checkInput();
            }}
          />
          <p id="msg"></p>
        </p>
      </div>
    </div>
  );
};

export default Homepage;
