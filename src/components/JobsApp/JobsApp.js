import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import JobsList from "./JobsList/JobsList";
import JobAddTask from "./JobAddTask/JobAddTask";
import JobDetails from "./JobDetails/JobDetails";
import TaskService from "../../service/TaskService";
import TaskDetails from "../Tasks/TaskDetails/TaskDetails";
import JobEdit from "./JobEdit/JobEdit";

class JobsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            task: {}
        };
        this.createTask = this.createTask.bind(this);
        this.addTaskToJob = this.addTaskToJob.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs() {
        JobService.getAllTasksInProgress().then(response => {
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

    updateJob(jobId, updatedJob) {
        JobService.updateJob(jobId, updatedJob).then(response => {
            const newJob = response.data;
            this.setState(prevState => {
                const newJobs = prevState.jobs.map(j => {
                    if (j.jobId === newJob.jobId) {
                        return newJob;
                    }
                    return j;
                });
                return {
                    "jobs": newJobs
                }
            })
        })
    }

    deleteJob(jobId) {
        JobService.deleteJob(jobId).then(response => {
            const toDelete = response.data;
            this.setState(prevState => {
                const newJobs = prevState.jobs.filter(job => {
                    return job.jobId !== toDelete.jobId
                });
                return {
                    "jobs": newJobs
                }
            })
        })
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/jobs"} exact render={() => <JobsList jobs={this.state.jobs} onDelete={this.deleteJob}/>} />
                        <Route path={"/jobs/:jobId/edit"} exact render={() => <JobEdit onSubmit={this.updateJob}/>}/>
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