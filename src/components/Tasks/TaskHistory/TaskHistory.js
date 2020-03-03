import React, {useEffect, useState} from "react";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import {useHistory} from "react-router";
import moment from "moment";
import {Link} from "react-router-dom";

const TaskHistory = (props) => {

    const history = useHistory();

    const [task] = useState(props.task);

    const calculateTotalWorkingTime = () => {
        let seconds = Math.floor(task.totalWorkTime / 1000000000);
        let minutes = 0;
        let hours = 0;
        if (seconds > 60) {
            minutes = Math.floor(seconds / 60);
            seconds %= 60;
            if (minutes > 60) {
                hours = Math.floor(minutes / 60);
                minutes %= 60;
            }
        }
        return `${hours}H:${minutes}M:${seconds}S`;
    };

    const [employeeName, setEmployeeName] = useState("");
    const [machineName, setMachineName] = useState("");
    const [status, setStatus] = useState(props.task.finished);

    useEffect(() => {
        EmployeeService.getEmployee(props.task.employee.employeeId).then(response => {
            setEmployeeName(response.data.firstName + " " + response.data.lastName)
        })
    }, []);

    useEffect(() => {
        MachineService.getMachine(props.task.machine.machineId).then(response => {
            setMachineName(response.data.name + " - " + response.data.shortName);
        })
    }, []);

    const onTaskFinished = (e) => {
        e.preventDefault();
        props.onTaskFinished(task.taskId);
        setStatus(!status);
    };

    return (
        <tr>
            <td>{task.taskName}</td>
            <td>{employeeName}</td>
            <td>{machineName}</td>
            <td>{moment(task.plannedStartDate).format("DD-MMM-YYYY")} / {(task.realStartDate && moment(task.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{moment(task.plannedEndDate).format("DD-MMM-YYYY")} / {(task.realEndDate && moment(task.realEndDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{task.plannedHours} / {task.totalWorkTime}</td>
            <td>{task.minutesForPiece.toFixed(1)} / {task.realMinutesForPiece.toFixed(1)}</td>
            <td>{(status && "Finished") || "Not Finished"}</td>
            <td>
                <Link to={`/jobs/history/${props.jobId}/tasks/${task.taskId}`} className="btn btn-secondary btn-sm">
                    Details
                </Link>
                {!status &&
                <Link to={`/jobs/${props.jobId}/tasks/${task.taskId}/edit`} className="btn btn-secondary btn-sm">
                    Update task
                </Link>
                }
                {!status &&
                <form onSubmit={onTaskFinished}>
                    <button className="btn btn-sm btn-secondary">Complete Task
                    </button>
                </form>
                }
            </td>
        </tr>
    );
};

export default TaskHistory;