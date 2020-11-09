import React from 'react';
import { Grid } from './Grid';
import { Button } from './Button';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.speed = 300;
        this.rows = 50;
        this.columns = 50;
        this.state = {
            generation: 0,
            liveCells: null,
            fullGrid: Array(this.rows)
                .fill()
                .map(() => Array(this.columns).fill(false)),
        };
        this.selectBox = this.selectBox.bind(this);
        this.start = this.start.bind(this);
        this.startButton = this.startButton.bind(this);
        this.stopButton = this.stopButton.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.initialSeed = this.initialSeed.bind(this);
    }

    initialSeed() {
        let arrCopy = this.state.fullGrid.map(inner => inner.slice());
        let liveCells = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (Math.floor(Math.random() * 20) + 1 === 1) {
                    arrCopy[i][j] = true;
                }
                if (arrCopy[i][j]) liveCells += 1;
            }
        }
        this.setState({
            fullGrid: arrCopy,
            liveCells: liveCells,
        });
    }

    clearBoard() {
        let newGrid = Array(this.rows)
            .fill()
            .map(() => Array(this.columns).fill(false));

        this.setState({
            fullGrid: newGrid,
            generation: 0,
            liveCells: 0,
        });
    }

    startButton() {
        clearInterval(this.generationInterval);
        this.generationInterval = setInterval(this.start, this.speed);
    }

    stopButton() {
        clearInterval(this.generationInterval);
    }

    start() {
        let initialGrid = this.state.fullGrid;
        let arrCopy = this.state.fullGrid.map(inner => inner.slice());
        let liveCells = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let count = 0;
                // Logic taken from https://www.youtube.com/watch?v=PM0_Er3SvFQ
                if (i > 0) if (initialGrid[i - 1][j]) count++; // checking [0, -1] if not in first row
                if (i > 0 && j > 0) if (initialGrid[i - 1][j - 1]) count++; // checking [-1, -1] if i and j not in first row
                if (i > 0 && j < this.columns - 1)
                    if (initialGrid[i - 1][j + 1]) count++; // checking [1, -1]
                if (j < this.columns - 1) if (initialGrid[i][j + 1]) count++; // checking [1, 0] if j is not last column
                if (j > 0) if (initialGrid[i][j - 1]) count++; // checking [-1, 0] if j is not first column
                if (i < this.rows - 1) if (initialGrid[i + 1][j]) count++; // checking [0, 1] if i is not first row
                if (i < this.rows - 1 && j > 0)
                    if (initialGrid[i + 1][j - 1]) count++; // checking [-1, 1]
                if (i < this.rows - 1 && j < this.columns - 1)
                    if (initialGrid[i + 1][j + 1]) count++; // checking [1, 1]
                // final checks to determine dead or alive cell
                if (initialGrid[i][j] && (count < 2 || count > 3))
                    arrCopy[i][j] = false;
                // final checks to determine dead or alive cell
                if (!initialGrid[i][j] && count === 3) arrCopy[i][j] = true;
                if (arrCopy[i][j]) liveCells += 1;
            }
        }

        this.setState({
            fullGrid: arrCopy,
            generation: this.state.generation + 1,
            liveCells: liveCells,
        });
    }

    selectBox(row, column) {
        let arrCopy = this.state.fullGrid.map(inner => inner.slice());
        let num = 0;
        if (arrCopy[row][column]) {
            arrCopy[row][column] = false;
            num = -1;
        } else {
            arrCopy[row][column] = true;
            num = 1;
        }
        this.setState({
            fullGrid: arrCopy,
            generation: this.state.generation + 1,
            liveCells: this.state.liveCells + num,
        });
    }

    componentDidMount() {
        this.initialSeed();
        this.startButton();
    }

    render() {
        return (
            <div>
                <h1>Conway&apos;s Game of Life</h1>
                <h2>Live Cells: {this.state.liveCells}</h2>
                <h2>Generations: {this.state.generation}</h2>
                <Button
                    startButton={this.startButton}
                    stopButton={this.stopButton}
                    initialSeed={this.initialSeed}
                    clear={this.clearBoard}
                />
                <Grid
                    fullGrid={this.state.fullGrid}
                    cols={this.columns}
                    row={this.rows}
                    selectBox={this.selectBox}
                />
            </div>
        );
    }
}
