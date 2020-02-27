import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

const Job = (props) => {
    return (
        <tr>
            <td>{props.job.jobName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.sketchName}</a></td>
            {/*<td>{props.job.startDateTime}</td>*/}
            <td>{ moment(props.job.startDate).format("DD-MMM-YYYY")}</td>
            <td>{ moment(props.job.endDate).format("DD-MMM-YYYY")}</td>
            <td>{props.job.estimatedHours}</td>
            <td>{props.job.numberOfPieces}</td>
            <td>{props.job.sketch.minutesForPiece}</td>
            <td>{(props.job.isFinished && "FINISHED") || "NOT FINISHED"}</td>
            <td>
                <Link className="btn btn-sm btn-secondary"
                      to={"/jobs/" + props.job.jobId + "/edit"}>
                    <span className="fa fa-edit"/>
                    <span><strong>Edit</strong></span>
                </Link>
                <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => props.onDelete(props.job.jobId)}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                <Link className="btn btn-sm btn-outline-dark"
                      to={"/jobs/" + props.job.jobId + "/details"}>
                    <span><strong>Details</strong></span>
                </Link>
                <Link className="btn btn-sm btn-outline-dark" to={"/jobs/" + props.job.jobId + "/addTask"}>
                    <span><strong>Add Task</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default Job;