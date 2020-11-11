import React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "./Grid";
import { Button } from "./Button";
import { BoardContext } from "./BoardContext";
import { GameContext } from "./GameContext";

const Main = () => {
  const [boardState, setBoardState] = useContext(BoardContext);
  const [gameState, setGameState] = useContext(GameContext);
  const [speed, setSpeed] = useState(1000);

  const initialSeed = () => {
    let status = {};
    let liveCells = 0;
    for (let i = 0; i < boardState.nRow; i++) {
      for (let j = 0; j < boardState.nCol; j++) {
        let idx = i * boardState.nCol + j + 1;
        let val = Math.floor(Math.random() * 2);
        status[idx] = val;
        if (val === 1) {
          liveCells += 1;
        }
      }
    }
    return [status, liveCells];
  };

  const addSeed = () => {
    let status = boardState.currentBoard;
    let liveCells = boardState.liveCells;
    let lastAlive = boardState.lastAlive;

    for (let i = 0; i < boardState.nRow; i++) {
      for (let j = 0; j < boardState.nCol; j++) {
        var idx = i * boardState.nCol + j + 1;
        if (status[idx] === 1) {
          continue;
        }
        if (Math.floor(Math.random() * 20) + 1 === 1) {
          status[idx] = 1;
          lastAlive[idx] = [1, 1];
        }
        if (status[idx]) liveCells += 1;
      }
    }
    setBoardState((state) => ({
      ...state,
      currentBoard: status,
      liveCells: liveCells,
      lastAlive: lastAlive,
    }));
  };

  const clearBoard = () => {
    let status = {};
    let lastAlive = {};
    for (let i = 0; i < boardState.nRow; i++) {
      for (let j = 0; j < boardState.nCol; j++) {
        let idx = i * boardState.nCol + j + 1;
        status[idx] = 0;
        lastAlive[idx] = [1, 1];
      }
    }
    setBoardState((state) => ({
      ...state,
      currentBoard: status,
      liveCells: 0,
      lastAlive: lastAlive,
    }));
    setGameState((state) => ({
      ...state,
      generation: 0,
    }));
  };

  const startButton = () => {
    let gameMode = gameState.gameMode;
    if (gameMode === 1) {
      setGameState((state) => ({
        ...state,
        gameMode: 1 - gameMode,
      }));
    }
  };

  const stopButton = () => {
    let gameMode = gameState.gameMode;
    if (gameMode === 0) {
      setGameState((state) => ({
        ...state,
        gameMode: 1 - gameMode,
      }));
    }
  };

  const displayHeatButton = () => {
    let heat = gameState.heat;
    console.log(heat);
    setGameState((state) => ({
      ...state,
      heat: 1 - heat,
    }));
  };

  const selectBox = (row, column) => {
    let arrCopy = boardState.currentBoard.map((inner) => inner.slice());
    let num = 0;
    if (arrCopy[row][column]) {
      arrCopy[row][column] = false;
      num = -1;
    } else {
      arrCopy[row][column] = true;
      num = 1;
    }
    let generation = gameState.generation + 1;
    let liveCells = boardState.liveCells + num;
    setBoardState((state) => ({
      ...state,
      currentBoard: arrCopy,
      liveCells: liveCells,
    }));
    setGameState((state) => ({ ...state, generation: generation }));
  };

  const updateLastAlive = (board) => {
    let lastAlive = {};
    for (let i = 0; i < boardState.nRow; i++) {
      for (let j = 0; j < boardState.nCol; j++) {
        let idx = i * boardState.nCol + j + 1;
        if (board[idx] === 0) {
          lastAlive[idx] = [0, 0];
        } else {
          lastAlive[idx] = [1, 1];
        }
      }
    }
    return lastAlive;
  };

  const changeSpeed = (e) => {
    if (gameState.gameMode === 1) {
      const val = e.target.value;
      setSpeed(val);
    }
  };

  useEffect(() => {
    var [board, liveCells] = initialSeed();
    setBoardState((state) => ({
      ...state,
      currentBoard: board,
      liveCells: liveCells,
      lastAlive: updateLastAlive(board),
    }));
  }, []);

  return (
    <div>
      <h1>Conway&apos;s Game of Life</h1>
      <h2>Game Status: {gameState.gameMode ? "paused" : "start"}</h2>
      <h2>Live Cells: {boardState.liveCells}</h2>
      <h2>Generations: {gameState.generation}</h2>
      <br></br>
      <h2>Speed: {speed}</h2>
      <input
        className="speed"
        type="number"
        name="column"
        placeholder="Enter a speed from 100 to 1000"
        onChange={(e) => changeSpeed(e)}
      />
      <br />
      <br />
      <Button
        startButton={() => startButton()}
        stopButton={() => stopButton()}
        initialSeed={() => addSeed()}
        clear={() => clearBoard()}
        displayHeat={() => displayHeatButton()}
      />
      <Grid selectBox={() => selectBox()} speed={speed}></Grid>
    </div>
  );
};

export default Main;
