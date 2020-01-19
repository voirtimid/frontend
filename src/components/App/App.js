import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import logo from '../../logo.svg';
import './App.css';

import Header from "../Header/Header";

function App() {
  return (
    <div className="App">
        <Router>
            <Header/>
        </Router>
    </div>
  );
}

export default App;
