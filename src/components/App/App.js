import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
import autoBindReact from "auto-bind";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };

        autoBindReact(this);
    }

    manageUser(user) {
        this.setState(() => ({
            "user": user
        }));
    }

    render() {
        return (
            <Fragment>
                <div className="App">
                    <Router>
                        <Header user={this.state.user}/>
                        <Switch>
                            <Route path={"/sketches"}>
                                <SketchesApp/>
                            </Route>
                            <Route path={"/machines"}>
                                <MachinesApp/>
                            </Route>
                            <Route path={"/employees"}>
                                <EmployeesApp/>
                            </Route>
                            <Route path={"/jobs"}>
                                <JobsApp/>
                            </Route>
                            <Route path={"/history"}>
                                <JobsHistoryApp/>
                            </Route>
                            <Route path={"/gantt"}>
                                <GanttChart/>
                            </Route>
                            <Route path={"/calendar"}>
                                <CalendarApp/>
                            </Route>

                            <Route path={"/login"}>
                                <UserManagementApp login={this.manageUser} user={this.state.user}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <Footer/>
            </Fragment>
        );
    }
}

export default App;
