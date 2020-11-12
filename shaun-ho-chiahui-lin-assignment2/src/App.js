import React from 'react';
import Main from './Main';
import Homepage from './components/Hompage';
import Rules from './components/Rules';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BoardContextProvider } from './BoardContext';
import { GameContextProvider } from './GameContext';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/game">
                    <BoardContextProvider>
                        <GameContextProvider>
                            <Main />
                        </GameContextProvider>
                    </BoardContextProvider>
                </Route>
                <Route path="/rules" component={Rules} />
                <Route path="/">
                    <BoardContextProvider>
                        <Homepage />
                    </BoardContextProvider>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
