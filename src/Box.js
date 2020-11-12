import React, { useState, useEffect, useContext } from 'react';
import { BoardContext } from './BoardContext';
import { GameContext } from './GameContext';
import { PropTypes } from 'prop-types';
import './style/Box.css';

const Box = props => {
    const [boardState, setBoardState] = useContext(BoardContext);
    const { currentBoard, lastAlive } = boardState;
    const [gameState] = useContext(GameContext);
    const [color, setColor] = useState('white');

    const colors = [
        '#eeebc8',
        '#f3eb76',
        '#f5d365',
        '#ebb60a',
        '#e9854b',
        '#e45d0f',
        '#da0404',
        '#ad0202',
        '#740808',
        '#360000',
        '#000000',
        '#ffffff',
    ];

    // function to get the right color for each box
    // first determine the gameState, whether it should be heatmap or normal mode
    // if it is heatmap, we will have to select the right color from the color array (only colors[0] to colors[9] apply)
    // first calculate the (current generation - the generation that the cell was last alive). If the difference is >= 10,
    // means the cell has been dead for more than 10 generations, so we can do (10 - 9 - 1), which is 0 so color[0] will be the color
    // if (current generation - generation that cell was last alive) < 10, we still do (10 - result - 1), but the color will be
    // further up on the color array
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

    // function to handle the click on a cell to toggle it alive or dead
    // can only toggle alive or dead when the game is paused
    const handleClick = () => {
        let liveCells = boardState.liveCells;
        if (gameState.gameMode === 0) {
            return;
        }

        // also have to adjust the last alive array for each cell that was clicked
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
        // change cell from alive to dead or dead to alive
        currentBoard[props.boxDxDy] = 1 - currentBoard[props.boxDxDy];
        setBoardState(state => ({
            ...state,
            currentBoard: currentBoard,
            lastAlive: lastAlive,
            liveCells: liveCells,
        }));
        console.log(props.boxDxDy);
        console.log(
            'id: ' + currentBoard[props.boxDxDy],
            'lastAlive: ' + lastAlive[props.boxDxDy]
        );
    };

    // set color called when display, generation, or currentBoard changes
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
            onClick={handleClick}></div>
    );
};

Box.propTypes = {
    id: PropTypes.number,
    boxDxDy: PropTypes.number,
};

export default Box;
