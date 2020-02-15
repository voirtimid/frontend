import React from "react";
import {Link} from "react-router-dom";

const Job = (props) => {
    return (
        <tr>
            <td>{props.job.jobName}</td>
            <td>{props.job.committeeName}</td>
            <td>{props.job.startDate}</td>
            <td>{props.job.endDate}</td>
            <td>{props.job.estimation}</td>
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
            </td>
        </tr>
    );
};

export default Job;