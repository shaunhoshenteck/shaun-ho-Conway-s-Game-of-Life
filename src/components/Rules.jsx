import React from 'react';
import './styles.css';
import logo from './dna.png';
import { Link } from 'react-router-dom';

const Rules = () => {
    return (
        <div className="homepage">
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
                            <a className="onPage">Rules</a>
                        </li>
                    </Link>
                </ul>
            </nav>
            <div className="center">
                <div className="rulebox">
                    <div>RULES</div>
                    <ul>
                        <li>
                            Conway’s Game of Life is a simulation of a system
                            where individual cells “live” and “die” in a state
                            of relative equilibrium.
                        </li>
                        <li>
                            You will be given the opportunity to modify some of
                            the aspects of the game of life before starting the
                            simulation.
                        </li>
                        <li>
                            During the simulation, you will be able to adjust
                            the frequency of generations.
                        </li>
                        <li>
                            You will only be able to adjust the frequency of
                            generations when the simulation is NOT running.
                        </li>
                        <li>
                            You may seed more live cells into the grid at any
                            time
                        </li>
                        <li>You may stop the simulation at any time.</li>
                        <li>You may clear the simulation at any time.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Rules;
