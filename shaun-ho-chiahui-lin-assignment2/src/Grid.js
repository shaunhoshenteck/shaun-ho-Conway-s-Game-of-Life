import React from 'react';
import { PropTypes } from 'prop-types';
import { Box } from './Box';

export class Grid extends React.Component {
    render() {
        let width = this.props.cols * 20;
        let arrOfRows = [];
        let boxClass = '';
        // console.log(this.props.row);
        for (let i = 0; i < this.props.row; i++) {
            for (let j = 0; j < this.props.cols; j++) {
                let boxDxDy = '(' + i + ' , ' + j + ')';
                boxClass = this.props.fullGrid[i][j] ? 'cell on' : 'cell off';
                arrOfRows.push(
                    <Box
                        boxClass={boxClass}
                        key={boxDxDy}
                        boxDxDy={boxDxDy}
                        row={i}
                        col={j}
                        selectBox={this.props.selectBox}
                    />
                );
            }
        }
        // console.log(arrOfRows);
        return (
            <div className="grid" style={{ width: width }}>
                {arrOfRows}
            </div>
        );
    }
}

Grid.propTypes = {
    cols: PropTypes.number,
    row: PropTypes.number,
    fullGrid: PropTypes.arrayOf(PropTypes.array),
    selectBox: PropTypes.func,
};

export default Grid;
