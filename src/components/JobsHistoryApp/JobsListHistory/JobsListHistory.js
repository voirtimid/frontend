import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate"
import JobSearch from "../../JobsApp/JobSearch/JobSeaerch";

const JobsListHistory = (props) => {

    const jobs = props.jobs.map(job => <JobSearch key={job.jobId} job={job}/>);

    const emptyFilterJobs = {
        startDate: "",
        endDate: "",
        forWhat: ""
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

    let jobsTable = (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Drawing</th>
                    <th scope="col">Number of pieces</th>
                    <th scope="col">Created at:</th>
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

        console.log(changedFilter);
    };

    const filterData = (e) => {
        e.preventDefault();

        props.onSubmit(filterJob);
    };

    const clearFilters = () => {
        setFilterJob(emptyFilterJobs);
        props.onClearFilters();
    };

    return (
        <div>
            <h4 className="text-upper text-left">Завршени Работни налози</h4>

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
                            <label htmlFor="forWhat" className="col-sm-4 offset-sm-1 text-left">Finished or Created</label>
                            <div className="col-sm-6 form-inline">
                                <select name="forWhat" id="forWhat" onChange={handleInputChange}>
                                    <option disabled value="" selected hidden>Select Attribute</option>
                                    <option value="created">Created</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </div>
                        </div>

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
            <div>

                <div className={"row"}>
                    {jobsTable}
                </div>
                {paginate()}
            </div>

        </div>
    );
};

export default JobsListHistory;