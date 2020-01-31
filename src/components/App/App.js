import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Header from "../Header/Header";
import MachinesApp from "../MachinesApp/MachinesApp";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Header/>
                    <Switch>
                        <Route path={"/machines"}>
                            <MachinesApp />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
