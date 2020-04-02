import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router";
import JobService from "../../../service/JobService";
import moment from "moment";
import TaskHistory from "../../Tasks/TaskHistory/TaskHistory";
import {Link} from "react-router-dom";

const JobHistory = (props) => {

    const jobId = useParams().jobId;
    const[job, setJob] = useState({});
    const[tasks, setTasks] = useState([]);
    const [sketch, setSketch] = useState({});

    useEffect(() => {
        JobService.getAllTasksForJob(jobId).then(response => {
            setTasks(response.data);
        })
    }, []);

    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            setJob(response.data);
            setSketch(response.data.sketch);
        })
    }, []);


    const renderTasks = tasks.map(task => <TaskHistory key={task.taskId} jobId={jobId} task={task} />);

    return (
        <Fragment>
            <h4 className="text-upper text-left" >Job name: {job.jobName}</h4>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-light" >
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Drawing</th>
                        <th scope="col">Number of pieces</th>
                        <th scope="col">Created at: </th>
                        <th scope="col">Planned/Actual Start</th>
                        <th scope="col">Planned/Actual End</th>
                        <th scope="col">Estimated/Actual Hours</th>
                        <th scope="col">Estimated/Actual Time for Piece</th>
                        <th scope="col">Number of tasks</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{sketch.sketchName}</td>
                        <td><a href={`/sketches/${sketch.sketchId}`}>{sketch.drawing}</a></td>
                        <td>{job.numberOfPieces}</td>
                        <td>{moment(job.jobCreated).format("DD-MMM-YYYY")}</td>
                        <td>{ moment(job.plannedStartDate).format("DD-MMM-YYYY")} / {(job.realStartDate && moment(job.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}</td>
                        <td>{ moment(job.plannedEndDate).format("DD-MMM-YYYY")} /  {(job.realEndDate && moment(job.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}</td>
                        <td>{job.plannedHours} / {job.realHours}</td>
                        <td>{job.plannedTimeForPiece} / {job.realTimeForPiece}</td>
                        <td>{tasks.length}</td>
                    </tr>

                    </tbody>
                </table>

                <h3>Tasks</h3>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">Task Name</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Machine Name</th>
                            <th scope="col">Planned/Actual Start</th>
                            <th scope="col">Planned/Actual End</th>
                            <th scope="col">Planned/Actual hours</th>
                            <th scope="col">Planned/Actual minutes for piece</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderTasks}
                        </tbody>
                    </table>
                </div>

                <div>
                    <Link to={`/history/jobs`} className="btn btn-secondary">
                        Back to history
                    </Link>
                </div>


            </div>
        </Fragment>
    );
};

export default JobHistory;
