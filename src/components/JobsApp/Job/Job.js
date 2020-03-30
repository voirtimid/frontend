import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import $ from "jquery";
import 'datatables.net'

const Job = (props) => {

    const history = useHistory();

    const finishedTasks = props.job.tasks.filter(task => task.finished).length;

    const jobStatus = props.job.status;

    const completeJob = () => {
        props.onComplete(props.job.jobId);
        history.push("/jobs");
    };

    useEffect(() => {
        $(document).ready( function () {
            $('#jobsTable').dataTable( {
                "retrieve": true,
                "paging": false,
                "searching": false
            });
        });
    }, []);

    const getClassName = () => {
        switch (jobStatus) {
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
            <td>{props.job.sketch.sketchName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.drawing}</a></td>
            <td>{props.job.numberOfPieces}</td>
            <td>{moment(props.job.jobCreated).format("DD-MMM-YYYY")}</td>
            <td>{ (props.job.plannedStartDate && moment(props.job.plannedStartDate).format("DD-MMM-YYYY")) || "No tasks yet"} / {(props.job.realStartDate && moment(props.job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ (props.job.plannedEndDate && moment(props.job.plannedEndDate).format("DD-MMM-YYYY")) || "No tasks yet"} /  {(props.job.realEndDate && moment(props.job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{props.job.plannedHours.toFixed(1)} / {props.job.realHours.toFixed(1)}</td>
            <td>{props.job.plannedTimeForPiece.toFixed(1)} / {props.job.realTimeForPiece.toFixed(1)}</td>
            <td>{finishedTasks} / {props.job.tasks.length}</td>
            <td>
                <button type="button"
                        className="btn btn-success btn-sm"
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
