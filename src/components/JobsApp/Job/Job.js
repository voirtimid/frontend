import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import JobService from "../../../service/JobService";
import TaskService from "../../../service/TaskService";

const Job = (props) => {

    const history = useHistory();

    const [allTasksCompleted, setAllTasksCompleted] = useState(false);

    const completeJob = () => {
        props.onComplete(props.job.jobId);
        history.push("/jobs");
    };

    useEffect(() => {
        JobService.getAllTasksForJob(props.job.jobId).then(response => {
            const tasks = response.data.map(task => task.finished);
            const finished = tasks.every(el => el === true);
            setAllTasksCompleted(finished);

        })
    }, []);

    return (
        <tr>
            <td>{props.job.sketch.sketchName}</td>
            <td><a href={`/sketches/${props.job.sketch.sketchId}`}>{props.job.sketch.drawing}</a></td>
            <td>{props.job.numberOfPieces}</td>
            <td>{moment(props.job.jobCreated).format("DD-MMM-YYYY")}</td>
            <td>{ moment(props.job.plannedStartDate).format("DD-MMM-YYYY")} / {(props.job.realStartDate && moment(props.job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
            <td>{ moment(props.job.plannedEndDate).format("DD-MMM-YYYY")} /  {(props.job.realEndDate && moment(props.job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
            <td>{props.job.plannedHours} / {props.job.realHours}</td>
            <td>{props.job.plannedTimeForPiece} / {props.job.realTimeForPiece}</td>
            <td>{props.job.tasks.length}</td>
            <td>
                <button type="button"
                        className="btn btn-secondary btn-sm"
                        disabled={!allTasksCompleted}
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