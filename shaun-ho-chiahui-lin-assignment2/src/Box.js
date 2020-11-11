import React, { useState, useEffect, useContext } from "react";
import { BoardContext } from "./BoardContext";
import { GameContext } from "./GameContext";
import { PropTypes } from "prop-types";
import "./style/Box.css";

const Box = (props) => {
  const [boardState, setBoardState] = useContext(BoardContext);
  const { currentBoard, lastAlive } = boardState;
  const [gameState] = useContext(GameContext);
  const [color, setColor] = useState("white");

  const colors = [
    "#f7fcf0",
    "#e0f3db",
    "#ccebc5",
    "#a8ddb5",
    "#7bccc4",
    "#4eb3d3",
    "#2b8cbe",
    "#0868ac",
    "#084081",
    "#022146",
    "white",
    "black",
  ];

  const getColor = () => {
    let idx;
    let board = boardState.currentBoard;
    if (gameState.heat) {
      idx =
        10 -
        (gameState.generation - lastAlive[props.boxDxDy][1] >= 10
          ? 9
          : gameState.generation - lastAlive[props.boxDxDy][1]) -
        1;
    } else {
      if (board[props.boxDxDy] === 0) {
        idx = 11;
      } else {
        idx = 10;
      }
    }
    return colors[idx];
  };

  const handleClick = () => {
    let liveCells = boardState.liveCells;
    if (gameState.gameMode === 0) {
      return;
    }

    if (currentBoard[props.boxDxDy] === 0) {
      let last = lastAlive[props.boxDxDy][1];
      let secondLast = last;
      last = gameState.generation;
      lastAlive[props.boxDxDy] = [secondLast, last];
      liveCells += 1;
    }
    if (currentBoard[props.boxDxDy] === 1) {
      let secondLast = lastAlive[props.boxDxDy][0];
      lastAlive[props.boxDxDy] = [secondLast, secondLast];
      liveCells -= 1;
    }
    currentBoard[props.boxDxDy] = 1 - currentBoard[props.boxDxDy];
    setBoardState((state) => ({
      ...state,
      currentBoard: currentBoard,
      lastAlive: lastAlive,
      liveCells: liveCells,
    }));
    console.log(props.boxDxDy);
    console.log(
      "id: " + currentBoard[props.boxDxDy],
      "lastAlive: " + lastAlive[props.boxDxDy]
    );
  };

  useEffect(() => {
    setColor(getColor);
  }, [
    gameState.display,
    gameState.generation,
    boardState.currentBoard[props.boxDxDy],
  ]);

  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      id={props.boxDxDy}
      onClick={handleClick}
    >
      {props.boxDxDy}
    </div>
  );
};

Box.propTypes = {
  id: PropTypes.number,
};
export default Box;
