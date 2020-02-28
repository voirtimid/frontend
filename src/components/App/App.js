import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Header from "../Header/Header";
import MachinesApp from "../MachinesApp/MachinesApp";
import EmployeesApp from "../EmployeesApp/EmployeesApp";
import JobsApp from "../JobsApp/JobsApp";
import CalendarApp from "../CalendarApp/CalendarApp";
import JobService from "../../service/JobService";
import UserManagementApp from "../UserManagementApp/UserManagementApp";
import SketchesApp from "../SketchesApp/SketchesApp";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            data: [],
            user: {}
        };
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs() {
        JobService.getAllJobs().then(response => {
            const loadedJobs = response.data;
            const localData = loadedJobs.map(j => ({
                EndTime: new Date(j.endDateTime),
                StartTime: new Date(j.startDateTime),
                Subject: j.jobName
            }));
            this.setState(() => ({
                jobs: loadedJobs,
                data: localData
            }));
        });
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Header/>
                    <Switch>
                        <Route path={"/sketches"}>
                            <SketchesApp />
                        </Route>
                        <Route path={"/machines"}>
                            <MachinesApp />
                        </Route>
                        <Route path={"/employees"}>
                            <EmployeesApp />
                        </Route>
                        <Route path={"/jobs"}>
                            <JobsApp />
                        </Route>
                        <Route path={"/calendar"}>
                            <CalendarApp data={this.state.data}/>
                        </Route>

                        <Route path={"/login"}>
                            <UserManagementApp user={this.state.data}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
