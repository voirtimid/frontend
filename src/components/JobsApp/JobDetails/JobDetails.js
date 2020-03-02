import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router";
import JobService from "../../../service/JobService";
import Task from "../../Tasks/Task/Task";
import TaskService from "../../../service/TaskService";
import {Link} from "react-router-dom";

const JobDetails = (props) => {

    const jobId = useParams().jobId;
    const[tasks, setTasks] = useState([]);
    const[job, setJob] = useState({});
    const [sketch, setSketch] = useState({});

    useEffect(() => {
        JobService.getAllTasksForJob(jobId).then(response => {
            setTasks(response.data);
        })
    }, []);

    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            setJob(response.data);
            setSketch(response.data.sketch);
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
                    <th scope="col">Planned/Actual Start</th>
                    <th scope="col">Planned/Actual End</th>
                    <th scope="col">Planned/Actual hours</th>
                    <th scope="col">Planned/Actual minutes for piece</th>
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

            <h5 className="text-upper text-left row">
                Project name:
                <Link to={`/sketches/${sketch.sketchId}`}>
                    {sketch.drawing}
                </Link>
            </h5>
            <div className="row">
                {tasksTable}
            </div>
            <Link className="btn btn-sm btn-outline-dark" to={"/jobs/" + job.jobId + "/addTask"}>
                <span><strong>Add Task</strong></span>
            </Link>
            <Link className="btn btn-sm btn-primary" to={"/jobs"}>
                <span><strong>Back to Jobs</strong></span>
            </Link>
        </Fragment>
    );



};

export default JobDetails;