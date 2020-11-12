import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const BoardContext = createContext();

const BoardContextProvider = props => {
    const [boardState, setBoardState] = useState({
        nRow: 10,
        nCol: 10,
        currentBoard: {},
        lastAlive: {},
        liveCells: 0,
    });
    return (
        <BoardContext.Provider value={[boardState, setBoardState]}>
            {props.children}
        </BoardContext.Provider>
    );
};

BoardContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { BoardContext, BoardContextProvider };
