import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";
import TaskEmployee from "../TaskEmployee/TaskEmployee";

const TasksList = (props) => {

    const employeeId = useParams().employeeId;

    const [tasks, setTasks] = useState([]);

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        EmployeeService.getAllTasksForEmployee(employeeId).then(response => {
            setTasks(response.data);
        })
    }, []);

    useEffect(() => {
        EmployeeService.getEmployee(employeeId).then(response => {
            setEmployee(response.data);
        })
    }, []);

    const renderTasks = tasks.map(task => <TaskEmployee key={task.taskId} task={task} />);

    let tasksTable = (
        <div className="table-responsive">
            <table id="employeeTasks" className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Task Name</th>
                    <th scope="col">Machine Name</th>
                    <th scope="col">Planned/Actual Start</th>
                    <th scope="col">Planned/Actual End</th>
                    <th scope="col">Planned/Actual hours</th>
                    <th scope="col">Planned/Actual minutes for piece</th>
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
            <h4 className="text-upper text-left row">Tasks for the employee: <strong>{employee.firstName} {employee.lastName}</strong></h4>
            <div className="row">
                {tasksTable}
            </div>
        </Fragment>
    );
};

export default TasksList;