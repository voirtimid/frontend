import React from "react";
import moment from "moment";
import {Link} from "react-router-dom";

const Task = (props) => {

    const task = props.task;

    const employeeName = props.task.employee.firstName + " " + props.task.employee.lastName;
    const machineName = props.task.machine.name + " - " + props.task.machine.shortName;

    let status = props.task.finished;
    let taskStatus = props.task.status;

    const onTaskFinished = (e) => {
        e.preventDefault();
        props.onCompleteTask(task.taskId);
        status = !status;
        taskStatus = "FINISHED"
    };

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

    return (
        <tr className={getClassName()}>
            <td>{task.taskName}</td>
            <td>{employeeName}</td>
            <td>{machineName}</td>
            <td>{moment(task.plannedStartDate).format("DD-MMM-YYYY")} / {(task.realStartDate && moment(task.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{moment(task.plannedEndDate).format("DD-MMM-YYYY")} / {(task.realEndDate && moment(task.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{task.plannedHours.toFixed(1)} / {task.totalWorkTime.toFixed(1)}</td>
            <td>{task.minutesForPiece.toFixed(1)} / {task.realMinutesForPiece.toFixed(1)}</td>
            <td>{(status && "Finished") || "Not Finished"}</td>
            <td>
                <Link to={`/jobs/${props.jobId}/tasks/${task.taskId}`} className="btn btn-secondary btn-sm">
                    Details
                </Link>
                {!status &&
                <Link to={`/jobs/${props.jobId}/tasks/${task.taskId}/edit`} className="btn btn-secondary btn-sm">
                    <span className="fa fa-edit"/>
                    Update task
                </Link>
                }
                {!status &&
                <form onSubmit={onTaskFinished}>
                    <button className="btn btn-sm btn-success">Complete Task
                    </button>
                </form>
                }
                {!status &&
                <button className="btn btn-sm btn-outline-danger"
                        onClick={() => props.onDelete(task.taskId)}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                }
            </td>
        </tr>
    );
};

export default Task;
