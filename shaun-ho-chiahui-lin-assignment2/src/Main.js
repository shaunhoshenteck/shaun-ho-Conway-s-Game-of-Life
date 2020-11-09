import React from 'react';
import { Grid } from './Grid';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.speed = 100;
        this.rows = 10;
        this.columns = 50;
        this.state = {
            generation: 0,
            fullGrid: Array(this.rows)
                .fill()
                .map(() => Array(this.columns).fill(false)),
        };
        this.selectBox = this.selectBox.bind(this);
    }

    selectBox(row, column) {
        let arrCopy = this.state.fullGrid.map(inner => inner.slice());
        arrCopy[row][column] = !arrCopy[row][column];
        this.setState({
            fullGrid: arrCopy,
        });
    }

    render() {
        return (
            <div>
                <h1>Conway&apos;s Game of Life</h1>
                <Grid
                    fullGrid={this.state.fullGrid}
                    cols={this.columns}
                    row={this.rows}
                    selectBox={this.selectBox}
                />
                <h2>Generations: {this.state.generation}</h2>
            </div>
        );
    }
}
