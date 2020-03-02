import React, {useEffect, useState} from "react";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import {useHistory} from "react-router";
import moment from "moment";

const Task = (props) => {

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
    const [totalWorkTime] = useState(() => calculateTotalWorkingTime());
    const [workInProgress, setWorkInProgress] = useState(props.task.workInProgress);
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


    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onSubmit(workInProgress, task.taskId);
        setWorkInProgress(!workInProgress);
    };

    const onTaskFinished = (e) => {
        e.preventDefault();
        props.onTaskFinished(task.taskId);
        setStatus(!status);
    };

    const onTaskDetails = (e) => {
        e.preventDefault();
        history.push(`/jobs/${props.jobId}/tasks/${task.taskId}`);
    };

    return (
        <tr>
            <td>{task.taskName}</td>
            <td>{employeeName}</td>
            <td>{machineName}</td>
            <td>{ moment(task.plannedStartDate).format("DD-MMM-YYYY")} / {(task.realStartDate && moment(task.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ moment(task.plannedEndDate).format("DD-MMM-YYYY")} / {(task.realEndDate && moment(task.realEndDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{task.plannedHours} / {task.totalWorkTime}</td>
            <td>{task.minutesForPiece} / {task.realMinutesForPiece}</td>
            {/*<td>{totalWorkTime}</td>*/}
            <td>{(status && "Finished") || "Not Finished"}</td>
            <td>
                <form onSubmit={onTaskDetails}>
                    <button className="btn btn-sm btn-secondary">
                        <span>Details</span>
                    </button>
                </form>
                {!status &&
                <form onSubmit={onFormSubmit}>
                    <button className="btn btn-sm btn-secondary"><span
                        className="fas fa-clock">{(workInProgress && "End Working") || "Start Working"}</span></button>
                </form>
                }
                {!status &&
                <form onSubmit={onTaskFinished}>
                    <button className="btn btn-sm btn-secondary"><span className="fas fa-clock">Complete Task</span>
                    </button>
                </form>
                }
            </td>
        </tr>
    );
};

export default Task;