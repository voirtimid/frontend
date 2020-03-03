import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

const JobSearch = (props) => {
    return (
        <tr>
            <td>{props.job.sketch.sketchName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.drawing}</a></td>
            <td>{props.job.numberOfPieces}</td>
            <td>{ moment(props.job.jobCreated).format("DD-MMM-YYYY")}</td>
            <td>{ moment(props.job.plannedStartDate).format("DD-MMM-YYYY")} / {(props.job.realStartDate && moment(props.job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ moment(props.job.plannedEndDate).format("DD-MMM-YYYY")} /  {(props.job.realEndDate && moment(props.job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{props.job.plannedHours} / {props.job.realHours}</td>
            <td>{props.job.plannedTimeForPiece} / {props.job.realTimeForPiece}</td>
            <td>{props.job.tasks.length}</td>
            <td>
                <Link className="btn btn-secondary btn-sm"
                      to={"/jobs/history/" + props.job.jobId}>
                    <span><strong>Details</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default JobSearch;