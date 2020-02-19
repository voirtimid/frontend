import React, {Fragment} from "react";
import Job from "../Job/Job";
import {Link} from "react-router-dom";

const JobsList = (props) => {

    const jobs = props.jobs.map(job => <Job key={job.jobId} job={job} onDelete={props.onDelete} />);

    let jobsTable = (
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
                <tr>
                    <th scope="col">Job Name</th>
                    <th scope="col">Committee Name</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Estimation</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {jobs}
                </tbody>
            </table>
        </div>
    );

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Jobs</h4>

            <div className="row">
                {jobsTable}
            </div>

            <Link className="btn btn-outline-secondary mb-3 row" to={"/jobs/new"}>
                <span><strong>Add new job</strong></span>
            </Link>
        </Fragment>
    );
};

export default JobsList;