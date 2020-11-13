import React from 'react';
import { useContext } from 'react';
import { PropTypes } from 'prop-types';
import Box from './Box';
import { BoardContext } from './BoardContext';
import { GameContext } from './GameContext';
import useIntervalDisplay from './useIntervalDisplay';
import './style/Grid.css';

const Grid = props => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const [gameState, setGameState] = useContext(GameContext);

    // function to create the actual board based on rows and columns
    const createBoard = () => {
        let rows = [];
        for (let i = 0; i < boardState.nRow; i++) {
            let boxes = [];
            for (let j = 0; j < boardState.nCol; j++) {
                let boxID = i * boardState.nCol + j + 1;
                boxes.push(<Box key={boxID} boxDxDy={boxID} row={i} col={j} />);
            }
            rows.push(<div className="row">{boxes}</div>);
        }
        return <div className="board">{rows}</div>;
    };

    // function that contains the main logic of the game, looks in all 8 directions and checks whether cells are valid
    // if they are, update those cells into a new object. Concept was introduced to me by Chia-Hui (Godfrey)
    const gameStart = oldBoard => {
        var lastAlive = boardState.lastAlive;
        var generation = gameState.generation;
        let dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
        let updated_board = {};
        for (let i = 0; i < boardState.nRow; i++) {
            for (let j = 0; j < boardState.nCol; j++) {
                let liveNeighbors = 0;
                for (let d of dirs) {
                    let nx = i + d[0],
                        ny = j + d[1];
                    if (
                        0 <= nx &&
                        nx < boardState.nRow &&
                        0 <= ny &&
                        ny < boardState.nCol
                    ) {
                        liveNeighbors +=
                            oldBoard[nx * boardState.nCol + ny + 1];
                    }
                }
                //Dead becomes to live when it has exactly 3 live neighbors
                var idx = i * boardState.nCol + j + 1;
                if (oldBoard[idx] === 0) {
                    updated_board[idx] = liveNeighbors === 3 ? 1 : 0;
                }
                else {
                    // Alive box dies with less than 2 neighbors or more than 3 live neighbors
                    if (liveNeighbors < 2 || liveNeighbors > 3) {
                        updated_board[idx] = 0;
                    } else {
                        updated_board[idx] = 1;
                    }
                }
                // Box is alive so we have to update the last alive array
                if (updated_board[idx] === 1) {
                    let last = lastAlive[idx][1];
                    // console.log('last: ' + last);
                    let secondLast = last;
                    last = gameState.generation + 1;
                    lastAlive[idx] = [secondLast, last];
                }
            }
        }

        // after done making changes, count the total number of live boxs
        let liveCells = 0;
        for (let i = 0; i < boardState.nRow; i++) {
            for (let j = 0; j < boardState.nCol; j++) {
                let idx = i * boardState.nCol + j + 1;
                if (updated_board[idx] === 1) {
                    liveCells += 1;
                }
            }
        }
        setBoardState(state => ({
            ...state,
            currentBoard: updated_board,
            lastAlive: lastAlive,
            liveCells: liveCells,
        }));
        setGameState(state => ({
            ...state,
            generation: generation + 1,
        }));
    };

    useIntervalDisplay(() => {
        gameStart(boardState.currentBoard);
    }, props.speed);

    return <div className="board-pos">{createBoard()}</div>;
};

Grid.propTypes = {
    speed: PropTypes.number,
};
export default Grid;
