import React, {useEffect, useState} from "react";
import MachineService from "../../../service/MachineService";
import moment from "moment";
import {Link} from "react-router-dom";
import $ from "jquery";

const TaskEmployee = (props) => {

    const task = props.task;

    const taskStatus = props.task.status;

    const [machineName, setMachineName] = useState("");

    useEffect(() => {
        MachineService.getMachine(props.task.machine.machineId).then(response => {
            setMachineName(response.data.name + " - " + response.data.shortName);
        })
    }, []);

    useEffect(() => {
        $(document).ready( function () {
            $('#employeeTasks').dataTable( {
                "retrieve": true,
                "paging": false,
                "searching": false
            });
        });
    }, []);

    const getClassName = () => {
        switch (taskStatus) {
            case "FINISHED":
                return "table-success";
            case "BEHIND":
                return "table-danger";
            case "TODAY":
                return "table-warning";
            default:
                return ""
        }
    };

    let className = getClassName();

    return (
        <tr className={className}>
            <td>{task.taskName}</td>
            <td>{machineName}</td>
            <td>{moment(task.plannedStartDate).format("DD-MMM-YYYY")} / {(task.realStartDate && moment(task.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{moment(task.plannedEndDate).format("DD-MMM-YYYY")} / {(task.realEndDate && moment(task.realEndDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{task.plannedHours.toFixed(1)} / {task.totalWorkTime.toFixed(1)}</td>
            <td>{task.minutesForPiece.toFixed(1)} / {task.realMinutesForPiece.toFixed(1)}</td>
            <td>
                <Link to={`/employees/${props.task.employee.employeeId}/tasks/${task.taskId}`} className="btn btn-secondary btn-sm">
                    Details
                </Link>
            </td>
        </tr>
    );
};

export default TaskEmployee;
