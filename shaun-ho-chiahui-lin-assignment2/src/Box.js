import React from 'react';
import { PropTypes } from 'prop-types';

export class Box extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // console.log(this.props.row);
        // console.log(this.props.col);
        this.props.selectBox(this.props.row, this.props.col);
    }

    render() {
        return (
            <div
                id={this.props.boxDxDy}
                className={this.props.boxClass}
                onClick={this.handleClick}></div>
        );
    }
}

Box.propTypes = {
    boxClass: PropTypes.string,
    boxDxDy: PropTypes.string,
    row: PropTypes.number,
    col: PropTypes.number,
    selectBox: PropTypes.func,
};

export default Box;
