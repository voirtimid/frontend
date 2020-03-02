import React, {Fragment, useEffect, useState} from "react";
import Task from "../Task/Task";
import {useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";

const TasksList = (props) => {

    const employeeId = useParams().employeeId;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        EmployeeService.getAllTasksForEmployee(employeeId).then(response => {
            setTasks(response.data);
        })
    }, []);

    const renderTasks = tasks.map(task => <Task key={task.taskId} task={task} history={false}/>);

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
                {renderTasks}
                </tbody>
            </table>
        </div>
    );

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Tasks for the employee: <strong>{employeeId}</strong></h4>
            <div className="row">
                {tasksTable}
            </div>
        </Fragment>
    );
};

export default TasksList;