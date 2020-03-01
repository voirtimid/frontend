import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router";
import JobService from "../../../service/JobService";
import Task from "../../Tasks/Task/Task";
import TaskService from "../../../service/TaskService";
import Job from "../Job/Job";
import JobsList from "../JobsList/JobsList";
import {Link} from "react-router-dom";

const JobDetails = (props) => {

    const jobId = useParams().jobId;
    const[tasks, setTasks] = useState([]);
    const[job, setJob] = useState({});

    useEffect(() => {
        JobService.getAllTasksForJob(jobId).then(response => {
            setTasks(response.data);
        })
    }, []);

    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            setJob(response.data)
        })
    }, []);


    const updateTasks = (workInProgress, taskId) => {
        if (workInProgress) {
            TaskService.endWorkingOnTask(taskId).then(response => {
                const updatedTask = response.data;
                const newTasks = tasks.map(t => {
                    if (t.taskId === updatedTask.taskId) {
                        return updatedTask;
                    }
                    return t;
                });
                setTasks(newTasks);
            })
        } else {
            TaskService.startWorkingOnTask(taskId).then(response => {
                const updatedTask = response.data;
                const newTasks = tasks.map(t => {
                    if (t.taskId === updatedTask.taskId) {
                        return updatedTask;
                    }
                    return t;
                });
                setTasks(newTasks);
            })
        }
    };

    const closeTask = (taskId) => {
        TaskService.completeTask(taskId).then(response => {
            const updatedTask = response.data;
            const newTasks = tasks.map(t => {
                if (t.taskId === updatedTask.taskId) {
                    return updatedTask;
                }
                return t;
            });
            setTasks(newTasks);
        })
    };

    const tasksView = tasks.map(task => <Task key={task.taskId} jobId={jobId} task={task} onSubmit={updateTasks} onTaskFinished={closeTask}/>);

    let tasksTable = (
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Machine Name</th>
                    <th scope="col">Total working time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasksView}
                </tbody>
            </table>
        </div>
    );

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Tasks for the job: <strong>{job.jobName}</strong></h4>

            <div className="row">
                {tasksTable}
            </div>
            <Link className="btn btn-sm btn-outline-dark" to={"/jobs/" + job.jobId + "/addTask"}>
                <span><strong>Add Task</strong></span>
            </Link>
        </Fragment>
    );



};

export default JobDetails;