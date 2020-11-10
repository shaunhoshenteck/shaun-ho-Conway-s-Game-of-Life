import React from 'react';
import { Main } from './Main';
import Homepage from './components/Hompage';
import Rules from './components/Rules';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/game" component={Main} />
                <Route path="/rules" component={Rules} />
                <Route path="/" exact component={Homepage} />
            </Switch>
        </Router>
    );
}

export default App;
