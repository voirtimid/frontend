import React from "react";
import JobService from "../../service/JobService";
import {Route, Switch} from "react-router";
import JobsList from "./JobsList/JobsList";
import JobAddTask from "./JobAddTask/JobAddTask";
import JobDetails from "./JobDetails/JobDetails";
import TaskService from "../../service/TaskService";
import TaskDetails from "../Tasks/TaskDetails/TaskDetails";
import JobEdit from "./JobEdit/JobEdit";
import TaskEdit from "../Tasks/TaskEdit/TaskEdit";

class JobsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            task: {},
            pageSize:2,
            page:0,
            totalPages:0

        };
        this.createTask = this.createTask.bind(this);
        this.addTaskToJob = this.addTaskToJob.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);
        this.loadJobs = this.loadJobs.bind(this);
        this.completeJob = this.completeJob.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.closeTask = this.closeTask.bind(this);
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs(page = 0, size = 5) {
        JobService.getAllJobsPaged(page, size).then(response => {
            const jobs = response.data.content;
            const toShow = jobs.filter(job => {return job.finished !== true});
            this.setState({
                    jobs: toShow,
                    page: response.data.pageable.pageNumber,
                    pageSize: response.data.pageable.pageSize,
                    totalPages: response.data.totalPages
            });
        });
    }


    createTask(jobId, task) {
        TaskService.createTask(task).then(response => {
            this.setState(() => ({
                task: response.data
            }), () => this.addTaskToJob(jobId))
        });
    }

    addTaskToJob(jobId) {
        JobService.addTaskToJob(jobId, this.state.task).then(response => {
            const updatedJob = response.data;
            JobService.updateDates(updatedJob.jobId).then(response => {
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

    completeJob(jobId) {
        JobService.completeJob(jobId).then(response => {
            const completed = response.data;
            this.setState(prevState => {
                const newJobs = prevState.jobs.filter(job => {
                    return job.jobId !== completed.jobId
                });
                return {
                    "jobs": newJobs
                }
            })
        })
    }

    updateTask(taskDTO) {
        TaskService.updateTask_v2(taskDTO).then(response => {
            JobService.updateRealDates(taskDTO.jobId).then(response => {
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
            });
        })
    }

    closeTask(taskId) {
        TaskService.completeTask(taskId).then(response => {
            this.loadJobs();
        })
    };

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/jobs"} exact render={() => <JobsList onPageClick={this.loadJobs} jobs={this.state.jobs} onDelete={this.deleteJob} onComplete={this.completeJob} totalPages={this.state.totalPages}/>} />
                        <Route path={"/jobs/:jobId/edit"} exact render={() => <JobEdit onSubmit={this.updateJob}/>}/>
                        <Route path={"/jobs/:jobId/addTask"} exact render={() => <JobAddTask onCreate={this.createTask}/>}/>
                        <Route path={"/jobs/:jobId/tasks"} exact render={() => <JobDetails onCompleteTask={this.closeTask} />}/>
                        <Route path={"/jobs/:jobId/tasks/:taskId"} exact render={() => <TaskDetails />}/>
                        <Route path={"/jobs/:jobId/tasks/:taskId/edit"} exact render={() => <TaskEdit onSubmit={this.updateTask} />}/>
                    </Switch>
                </div>
            </main>
        );
    }
}

export default JobsApp;