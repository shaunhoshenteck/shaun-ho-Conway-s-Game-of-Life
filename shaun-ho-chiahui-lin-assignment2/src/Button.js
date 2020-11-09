import React from 'react';
import { PropTypes } from 'prop-types';

export class Button extends React.Component {
    render() {
        return (
            <div className="centered">
                <button onClick={this.props.startButton}>Start</button>
                <button onClick={this.props.stopButton}>Stop</button>
                <button onClick={this.props.initialSeed}>Seed</button>
                <button onClick={this.props.clear}>Clear</button>
            </div>
        );
    }
}

Button.propTypes = {
    startButton: PropTypes.func,
    stopButton: PropTypes.func,
    initialSeed: PropTypes.func,
    clear: PropTypes.func,
};

export default Button;
