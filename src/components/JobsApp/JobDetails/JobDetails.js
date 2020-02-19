import React, {Fragment, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import JobService from "../../../service/JobService";
import Task from "../../Task/Task";
import TaskService from "../../../service/TaskService";

const JobDetails = (props) => {

    const history = useHistory();

    const jobId = useParams();
    const[tasks, setTasks] = useState([]);
    const[job, setJob] = useState({});

    useEffect(() => {
        JobService.getAllTasksForJob(jobId.jobId).then(response => {
            console.log(response.data);
            setTasks(response.data);
        })
    }, []);

    useEffect(() => {
        JobService.getJob(jobId.jobId).then(response => {
            console.log(response.data);
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

    const tasksView = tasks.map(task => <Task key={task.taskId} task={task} onSubmit={updateTasks} onTaskFinished={closeTask}/>);

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
        </Fragment>
    );



};

export default JobDetails;