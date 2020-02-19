import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import JobsList from "./JobsList/JobsList";
import JobAdd from "./JobAdd/JobAdd";
import JobAddTask from "./JobAddTask/JobAddTask";
import TaskService from "../../service/TaskService";

class JobsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            task: {}
        };

        this.createJob = this.createJob.bind(this);
        this.createTask = this.createTask.bind(this);
        this.addEmployeeToTask = this.addEmployeeToTask.bind(this);
        this.addMachineToTask = this.addMachineToTask.bind(this);
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

    createJob(job) {
        JobService.createJob(job).then(response => {
            this.setState(prevState => {
                const newJobs = [...prevState.jobs, response.data];
                return {
                    'jobs': newJobs
                }
            })
        })
    }

    createTask(jobId, task) {
        TaskService.createTask(task).then(response => {
            JobService.addTaskToJob(jobId, response.data);
            this.setState(() => ({
                task: response.data
            }), () => this.addEmployeeToTask(jobId, task))
        });
        // JobService.addTaskToJob(jobId, task);
    }

    addEmployeeToTask(jobId, task) {
        JobService.addTaskToJob(jobId, task);
        const taskId = this.state.task.taskId;
        TaskService.addEmployeeToTask(taskId, task.employeeId).then(response => {
            this.setState(() => ({
                task: response.data
            }), () => this.addMachineToTask(task))
        })
    }

    addMachineToTask(task) {
        const taskId = this.state.task.taskId;
        TaskService.addMachineToTask(taskId, task.machineId).then(response => {
            this.setState(() => ({
                task: response.data
            }))
        })
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/jobs"} exact render={() => <JobsList jobs={this.state.jobs}/>} />
                        <Route path={"/jobs/new"} exact render={() => <JobAdd onCreate={this.createJob}/>}/>
                        <Route path={"/jobs/:jobId/addTask"} exact render={() => <JobAddTask onCreate={this.createTask}/>}/>
                    </Switch>
                </div>
            </main>
        );
    }
}



export default JobsApp;