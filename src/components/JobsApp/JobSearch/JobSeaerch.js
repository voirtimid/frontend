import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import $ from "jquery";

const JobSearch = (props) => {

    useEffect(() => {
        $(document).ready( function () {
            $('#historyJobsTable').dataTable( {
                "retrieve": true,
                "paging": false,
                "searching": false,
                "info": false
            });
        });
    }, []);

    return (
        <tr>
            <td>{props.job.sketch.sketchName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.drawing}</a></td>
            <td>{props.job.numberOfPieces}</td>
            <td>{ moment(props.job.jobCreated).format("DD-MMM-YYYY")}</td>
            <td>{ moment(props.job.jobFinished).format("DD-MMM-YYYY")}</td>
            <td>{ moment(props.job.plannedStartDate).format("DD-MMM-YYYY")} / {(props.job.realStartDate && moment(props.job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ moment(props.job.plannedEndDate).format("DD-MMM-YYYY")} /  {(props.job.realEndDate && moment(props.job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{props.job.plannedHours.toFixed(1)} / {props.job.realHours.toFixed(1)}</td>
            <td>{props.job.plannedTimeForPiece.toFixed(1)} / {props.job.realTimeForPiece.toFixed(1)}</td>
            <td>{props.job.tasks.length}</td>
            <td>
                <Link className="btn btn-secondary btn-sm"
                      to={"/history/jobs/" + props.job.jobId}>
                    <span><strong>Details</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default JobSearch;
