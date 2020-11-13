import React, { useState, useContext, useEffect, useRef } from 'react';
import { GameContext } from './GameContext';

//Reference: https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useIntervalDisplay = (callback, delay) => {
    const savedCallback = useRef();
    const [gameState, setGameState] = useContext(GameContext);
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        console.log(gameState.gameMode);
        console.log('hello');
        if (!gameState.gameMode && delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [gameState.gameMode, delay]);
};

export default useIntervalDisplay;
