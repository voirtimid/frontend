import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import './App.css';
import Header from "../Header/Header";
import MachinesApp from "../MachinesApp/MachinesApp";
import EmployeesApp from "../EmployeesApp/EmployeesApp";
import JobsApp from "../JobsApp/JobsApp";
import UserManagementApp from "../UserManagementApp/UserManagementApp";
import SketchesApp from "../SketchesApp/SketchesApp";
import GanttChart from "../GanttChart/GanttChart";
import JobsHistoryApp from "../JobsHistoryApp/JobsHistoryApp";
import CalendarApp from "../CalendarApp/CalendarApp";
import Footer from "../Footer/Footer";
import Home from "../Home/Home";

const App = () => {

    let userFromLocalStorage = localStorage.getItem("user");
    let parsed = JSON.parse(userFromLocalStorage);

    const isLoggedIn = !!localStorage.getItem("user");

    const [user, setUser] = useState(parsed || {});
    const [loggedIn, setLoggedIn] = useState(isLoggedIn);

    const manageUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setLoggedIn(true);
    };

    const logOutUser = () => {
        localStorage.removeItem("user");
        setUser({});
        setLoggedIn(false);
        window.location.href = "/";
    };

    let mustBeLoggedIn = (
        <Fragment>
            <Route path={"/sketches"}>
                <SketchesApp loggedIn={loggedIn} userRole={user.role}/>
            </Route>
            <Route path={"/jobs"}>
                <JobsApp loggedIn={loggedIn} userRole={user.role}/>
            </Route>
            <Route path={"/history"}>
                <JobsHistoryApp loggedIn={loggedIn}/>
            </Route>
            <Route path={"/machines"}>
                <MachinesApp loggedIn={loggedIn} userRole={user.role}/>
            </Route>
            <Route path={"/employees"}>
                <EmployeesApp loggedIn={loggedIn} userRole={user.role}/>
            </Route>
            <Route path={"/gantt"}>
                <GanttChart/>
            </Route>
            <Route path={"/calendar"}>
                <CalendarApp/>
            </Route>
        </Fragment>
    );

    let toShow = undefined;

    if (isLoggedIn) {
        toShow = mustBeLoggedIn;
    }

    return (
        <Fragment>
            <div className="App">
                <Router>
                    <Header user={user} loggedIn={loggedIn} logOutUser={logOutUser}/>
                    <Switch>
                        <Route path={"/"} exact>
                            <Home/>
                        </Route>

                        <Route path={"/login"}>
                            <UserManagementApp login={manageUser} user={user}/>
                        </Route>
                        {toShow}
                    </Switch>
                </Router>
            </div>
            <Footer/>
        </Fragment>
    );
};

export default App;
