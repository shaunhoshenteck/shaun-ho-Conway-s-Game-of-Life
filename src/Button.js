import React from 'react';
import { PropTypes } from 'prop-types';

// only class that didnt need to be changed during initial construction of project using class components
export class Button extends React.Component {
    render() {
        return (
            <div className="centered">
                <button onClick={this.props.startButton}>Start</button>
                <button onClick={this.props.stopButton}>Stop</button>
                <button onClick={this.props.initialSeed}>Seed</button>
                <button onClick={this.props.clear}>Clear</button>
                <button onClick={this.props.displayHeat}>Display Heat</button>
            </div>
        );
    }
}

Button.propTypes = {
    startButton: PropTypes.func,
    stopButton: PropTypes.func,
    initialSeed: PropTypes.func,
    clear: PropTypes.func,
    displayHeat: PropTypes.func,
};

export default Button;
