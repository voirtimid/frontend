import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";

const Job = (props) => {

    const history = useHistory();

    const [finishedTasks] = useState(props.job.tasks.filter(task => task.finished).length);

    const completeJob = () => {
        props.onComplete(props.job.jobId);
        history.push("/jobs");
    };

    return (
        <tr>
            <td>{props.job.sketch.sketchName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.drawing}</a></td>
            <td>{props.job.numberOfPieces}</td>
            <td>{moment(props.job.jobCreated).format("DD-MMM-YYYY")}</td>
            <td>{ (props.job.plannedStartDate && moment(props.job.plannedStartDate).format("DD-MMM-YYYY")) || "No tasks yet"} / {(props.job.realStartDate && moment(props.job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ (props.job.plannedEndDate && moment(props.job.plannedEndDate).format("DD-MMM-YYYY")) || "No tasks yet"} /  {(props.job.realEndDate && moment(props.job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{props.job.plannedHours} / {props.job.realHours}</td>
            <td>{props.job.plannedTimeForPiece} / {props.job.realTimeForPiece}</td>
            <td>{finishedTasks} / {props.job.tasks.length}</td>
            <td>
                <button type="button"
                        className="btn btn-secondary btn-sm"
                        disabled={(finishedTasks !== props.job.tasks.length) || (props.job.tasks.length === 0)}
                        onClick={() => completeJob()}>
                    Complete Job
                </button>
                <Link className="btn btn-secondary btn-sm"
                      to={"/jobs/" + props.job.jobId + "/tasks"}>
                    <span><strong>Tasks</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default Job;