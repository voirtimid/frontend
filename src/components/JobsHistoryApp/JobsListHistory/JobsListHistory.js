import React, {Fragment, useState} from "react";
import ReactPaginate from "react-paginate"
import JobSearch from "../../JobsApp/JobSearch/JobSeaerch";
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import JobService from "../../../service/JobService";
import moment from "moment";

const JobsListHistory = (props) => {

    const jobs = props.jobs.map(job => <JobSearch key={job.jobId} job={job}/>);

    const emptyFilterJobs = {
        startDate: "",
        endDate: "",
        forWhat: "",
        sketchName: ""
    };

    const [filterJob, setFilterJob] = useState(emptyFilterJobs);

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

    const jobsToPDF = (jobs) => {
        let doc = jsPDF();
        const mappedJobs = jobs.map(job => [
            job.jobName,
            moment(job.jobCreated).format("DD-MMM-YYYY"),
            moment(job.jobFinished).format("DD-MMM-YYYY"),
            job.numberOfPieces.toString(),
            `${moment(job.plannedStartDate).format("DD-MMM-YYYY")} / ${moment(job.realStartDate).format("DD-MMM-YYYY")}`,
            `${moment(job.plannedEndDate).format("DD-MMM-YYYY")} / ${moment(job.realEndDate).format("DD-MMM-YYYY")}`,
            `${job.plannedHours.toFixed(1)} / ${job.realHours.toFixed(1)}`,
            `${job.plannedTimeForPiece.toFixed(1)} / ${job.realTimeForPiece.toFixed(1)}`,
            job.tasks.length.toString()
        ]);

        doc.autoTable({
            head: [['Job Name', 'Created', 'Finished', "# of pieces", "Start Dates", "End Dates", "Hours", "Time for piece", "# of tasks"]],
            body: mappedJobs,
        });

        doc.save("download.pdf");
    };

    const exportDataToPDF = (all) => {
        if (all) {
            let promise;
            if (filterJob.forWhat === "") {
                promise = JobService.getAllFinishedJobs()
            } else {
                promise = JobService.getAllFilteredJobs(filterJob)
            }
            promise.then(response => {
                const finishedJobs = response.data;
                jobsToPDF(finishedJobs);
            })
        } else {
            jobsToPDF(props.jobs);
        }
    };

    let jobsTable = (
        <div className="table-responsive">
            <table id="historyJobsTable" className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Drawing</th>
                    <th scope="col">Number of pieces</th>
                    <th scope="col">Created at:</th>
                    <th scope="col">Finished at:</th>
                    <th scope="col">Planned/Actual Start</th>
                    <th scope="col">Planned/Actual End</th>
                    <th scope="col">Estimated/Actual Hours</th>
                    <th scope="col">Estimated/Actual Time for Piece</th>
                    <th scope="col">Number of tasks</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {jobs}
                </tbody>
            </table>
        </div>
    );

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const changedFilter = {
            ...filterJob,
            [name]: value
        };

        setFilterJob(changedFilter);
    };

    const filterData = (e) => {
        e.preventDefault();

        props.onSubmit(filterJob);
    };

    const clearFilters = () => {
        setFilterJob(emptyFilterJobs);
        props.onClearFilters();
    };

    let showPastOrders = (
        <Fragment>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                        aria-expanded="false" aria-controls="collapseExample">
                    Filter Data
                </button>
            </p>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <form onSubmit={filterData}>

                        <div className="form-group row">
                            <label htmlFor="forWhat" className="col-sm-4 offset-sm-1 text-left">Finished or
                                Created</label>
                            <div className="col-sm-6 form-inline">
                                <select name="forWhat" id="forWhat" onChange={handleInputChange}>
                                    <option disabled value="Created" selected hidden>Select Attribute</option>
                                    <option value="created">Created</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="sketchName" className="col-sm-4 offset-sm-1 text-left">Sketch Name</label>
                            <div className="col-sm-6 form-inline">
                                <input type="text" className="form-control" id="sketchName" name="sketchName"
                                       placeholder="Sketch Name" value={filterJob.sketchName}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">From Date</label>
                            <div className="col-sm-6 form-inline">
                                <input type="date" className="form-control" id="startDate" name="startDate"
                                       placeholder="Start Date" value={filterJob.startDate}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">To Date</label>
                            <div className="col-sm-6 form-inline">
                                <input type="date" className="form-control" id="endDate" name="endDate"
                                       placeholder="To Date" value={filterJob.endDate} onChange={handleInputChange}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div
                                className="col-sm-3  text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary text-upper">
                                    Search Jobs
                                </button>
                            </div>

                            <div
                                className="col-sm-6  text-center">
                                <button
                                    type="button"
                                    onClick={() => clearFilters()}
                                    className="btn btn-primary text-upper">
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Fragment>
                <div className="row mb-3">
                    {jobsTable}
                </div>
                {paginate()}
            </Fragment>

            <div className="form-group row">
                <div className="col-6">
                    <button type="button" className="btn btn-primary" onClick={() => exportDataToPDF(false)}> Export current page to PDF
                    </button>
                </div>
                <div className="col-6">
                    <button type="button" className="btn btn-primary" onClick={() => exportDataToPDF(true)}> Export all pages to PDF
                    </button>
                </div>
            </div>

        </Fragment>
    );

    let emptyResult = (
        <h3 className="col">Empty! There are no closed orders.</h3>
    );

    let toShow;

    if (props.jobs.length === 0) {
        toShow = emptyResult;
    } else {
        toShow = showPastOrders;
    }

    return (
        <Fragment>
            <h2 className="text-upper text-left">Closed Orders</h2>
            {toShow}
        </Fragment>
    );
};

export default JobsListHistory;
