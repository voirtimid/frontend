import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import JobsList from "./JobsList/JobsList";
import JobAddTask from "./JobAddTask/JobAddTask";
import JobDetails from "./JobDetails/JobDetails";
import TaskService from "../../service/TaskService";
import TaskDetails from "../Tasks/TaskDetails/TaskDetails";

class JobsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            task: {}
        };
        this.createTask = this.createTask.bind(this);
        this.addTaskToJob = this.addTaskToJob.bind(this);
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs() {
        JobService.getAllJobs().then(response => {
            this.setState(() => ({
                jobs: response.data
            }));
        })
    }

    createTask(jobId, task) {
        console.log(task);
        TaskService.createTask(task, jobId, task.employeeId, task.machineId, task.cncCodeId).then(response => {
            console.log(response.data);
            this.setState(() => ({
                task: response.data
            }), () => this.addTaskToJob(jobId))
        });
    }

    addTaskToJob(jobId) {
        JobService.addTaskToJob(jobId, this.state.task).then(response => {
            console.log(response.data);
        })
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/jobs"} exact render={() => <JobsList jobs={this.state.jobs}/>} />
                        <Route path={"/jobs/:jobId/addTask"} exact render={() => <JobAddTask onCreate={this.createTask}/>}/>
                        <Route path={"/jobs/:jobId/details"} exact render={() => <JobDetails />}/>
                        <Route path={"/jobs/:jobId/tasks/:taskId"} exact render={() => <TaskDetails/>}/>
                    </Switch>
                </div>
            </main>
        );
    }
}



export default JobsApp;