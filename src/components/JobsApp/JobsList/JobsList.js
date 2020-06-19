import React, {Fragment} from "react";
import Job from "../Job/Job";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"

const JobsList = (props) => {

    const jobs = props.jobs.map(job => <Job key={job.jobId} job={job} onDelete={props.onDelete}
                                            onComplete={props.onComplete} userRole={props.userRole}/>);

    const handlePageClick = (e) => {
        props.onPageClick(e.selected)
    };

    const paginate = () => {
        if (props.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={"previous"}
                               nextLabel={"next"}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={props.totalPages}
                               marginPagesDisplayed={5}
                               pageRangeDisplayed={5}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={props.page}
                               onPageChange={handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            );
        }
    };

    let jobsTable = (
        <div className="table-responsive">
            <table id="jobsTable" className="table table-bordered table-hover">
                <thead className="thead-light">
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
                    {props.userRole === "Admin" && <th scope="col">Actions</th>}
                </tr>
                </thead>
                <tbody>
                {jobs}
                </tbody>
            </table>
        </div>
    );

    let emptyResult = (
        <h3 className="col">Empty! There are no active orders. Add new one</h3>
    );

    let toShow;

    if (props.jobs.length === 0) {
        toShow = emptyResult;
    } else {
        toShow = jobsTable;
    }

    return (
        <Fragment>
            <h2 className="text-upper text-left">Orders</h2>
            {props.userRole === "Admin" &&
            <Link className="btn btn-outline-secondary mb-3 row" to={"/sketches"}>
                <span><strong>Create new order</strong></span>
            </Link>
            }
            <Fragment>

                <div className="row mb-3">
                    {toShow}
                </div>
                {props.jobs.length > 0 && paginate()}
            </Fragment>

        </Fragment>
    );
};

export default JobsList;
