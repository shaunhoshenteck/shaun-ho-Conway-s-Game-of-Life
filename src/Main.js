import React from 'react';
import { useState, useContext, useEffect } from 'react';
import Grid from './Grid';
import { Button } from './Button';
import { BoardContext } from './BoardContext';
import { GameContext } from './GameContext';
import { Link } from 'react-router-dom';
import logo from '././components/dna.png';

const Main = () => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const [gameState, setGameState] = useContext(GameContext);
    const [speed, setSpeed] = useState(1000);

    // initial seed function sets up the board with live and dead cells based on 5% rule
    // cells are stored in status starting from index 1 to index (total cells)
    const initialSeed = () => {
        let status = {};
        let liveCells = 0;
        for (let i = 0; i < boardState.nRow; i++) {
            for (let j = 0; j < boardState.nCol; j++) {
                let idx = i * boardState.nCol + j + 1;
                let val = Math.floor(Math.random() * 20) + 1;
                if (val === 1) {
                    // 1 is alive, 0 is dead
                    status[idx] = 1;
                } else {
                    status[idx] = 0;
                }
                if (status[idx] === 1) {
                    liveCells += 1;
                }
            }
        }
        return [status, liveCells];
    };

    // add seed function that is used to seed the board with more seeds based on 5% rule
    const addSeed = () => {
        let status = boardState.currentBoard;
        let liveCells = boardState.liveCells;
        let lastAlive = boardState.lastAlive;

        for (let i = 0; i < boardState.nRow; i++) {
            for (let j = 0; j < boardState.nCol; j++) {
                var idx = i * boardState.nCol + j + 1;
                // if cell is already alive, skip over it
                if (status[idx] === 1) {
                    continue;
                }
                //if cell is not alive, possibility to seed it
                if (Math.floor(Math.random() * 20) + 1 === 1) {
                    status[idx] = 1;
                    lastAlive[idx] = [1, 1];
                }
                if (status[idx]) liveCells += 1;
            }
        }
        setBoardState(state => ({
            ...state,
            currentBoard: status,
            liveCells: liveCells,
            lastAlive: lastAlive,
        }));
    };

    // function to clear the board, make all cells dead and last alive array all 1s
    // last alive is an object that stores an array of size 2 that keeps track of last 2 generations
    // in which the cell was last alive
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
        setBoardState(state => ({
            ...state,
            currentBoard: status,
            liveCells: 0,
            lastAlive: lastAlive,
        }));
        setGameState(state => ({
            ...state,
            generation: 0,
        }));
    };

    // function that changes the game mode from start to stop and stop to start
    // when game is running, gamemode is 0. When it is not game mode is 1
    const startButton = () => {
        let gameMode = gameState.gameMode;
        if (gameMode === 1) {
            setGameState(state => ({
                ...state,
                gameMode: 1 - gameMode,
            }));
        }
    };

    // function that changes the game mode from start to stop
    const stopButton = () => {
        let gameMode = gameState.gameMode;
        if (gameMode === 0) {
            setGameState(state => ({
                ...state,
                gameMode: 1 - gameMode,
            }));
        }
    };

    // function that toggles the game state between heat state and normal state (black and white)
    const displayHeatButton = () => {
        let heat = gameState.heat;
        setGameState(state => ({
            ...state,
            heat: 1 - heat,
        }));
    };

    // function that allows a cell to be toggled to be alive or dead
    const selectBox = (row, column) => {
        let arrCopy = boardState.currentBoard.map(inner => inner.slice());
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
        setBoardState(state => ({
            ...state,
            currentBoard: arrCopy,
            liveCells: liveCells,
        }));
        setGameState(state => ({ ...state, generation: generation }));
    };

    // function that initially checks the last alive generation for a cell and returns the last alive
    // object that contains an array of length 2 for each cell with their last alive generations at the start of the game
    const updateLastAlive = board => {
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

    // function that changes the speed of the game only when the game is running
    const changeSpeed = e => {
        if (gameState.gameMode === 1) {
            const val = e.target.value;
            setSpeed(val);
        }
    };

    // useEffect hook called only once for initial setup and having empty dependency array
    useEffect(() => {
        var [board, liveCells] = initialSeed();
        setBoardState(state => ({
            ...state,
            currentBoard: board,
            liveCells: liveCells,
            lastAlive: updateLastAlive(board),
        }));
    }, []);

    return (
        <div>
            <nav>
                <img className="logo" src={logo} />
                <ul>
                    <Link to="/">
                        <li>
                            <a>Home</a>
                        </li>
                    </Link>
                    <Link to="/rules">
                        <li>
                            <a>Rules</a>
                        </li>
                    </Link>
                </ul>
            </nav>
            <div className="center-gamepage">
                <div className="backdrop">
                    <div>
                        <h1>Conway&apos;s Game of Life</h1>
                    </div>
                    <h2>
                        Game Status:{' '}
                        {gameState.gameMode ? (
                            <h6 className="paused">Paused</h6>
                        ) : (
                            <h6 className="live">Live</h6>
                        )}
                    </h2>
                    <div className="stats">
                        <div>
                            <h2>Live Cells: {boardState.liveCells}</h2>
                        </div>
                        <div>
                            <h2>Generations: {gameState.generation}</h2>
                        </div>
                    </div>
                    <h2>Speed: {speed}</h2>
                    <input
                        className="speed"
                        type="number"
                        name="column"
                        placeholder="Enter a speed from 100 to 1000"
                        onChange={e => changeSpeed(e)}
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
                </div>
                <div className="grid-container">
                    <Grid selectBox={() => selectBox()} speed={speed}></Grid>
                </div>
            </div>
        </div>
    );
};

export default Main;
