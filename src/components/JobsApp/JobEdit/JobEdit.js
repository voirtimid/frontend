import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import JobService from "../../../service/JobService";
import moment from "moment";

const JobEdit = (props) => {

    const history = useHistory();
    const jobId = useParams().jobId;

    const [job, setJob] = useState({});
    const [sketch, setSketch] = useState({});

    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            const job = response.data;
            setJob(job);
            setSketch(job.sketch);
        })
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        console.log(job);
        props.onSubmit(job.jobId, job);

        history.push("/jobs")

    };

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;

        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'number') {
            value = Number(target.value);
        } else {
            value = target.value;
        }

        const changedJob = {
            ...job,
            [name]: value
        };

        setJob(changedJob);
    };

    const cancelGoBack = () => {
        history.push("/jobs");
    };

    return (
        <div>
            <h4>Add Job</h4>
            <form className='card' encType='multipart/form-data' onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label htmlFor="jobName" className="col-sm-4 offset-sm-1 text-left">Job Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="jobName" name="jobName"
                               placeholder="Job Name" value={job.jobName} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="sketchName" className="col-sm-4 offset-sm-1 text-left">Sketch Name</label>
                    <div className="col-sm-6">
                        <a href={`/sketches/${sketch.sketchId}`}>{sketch.sketchName}</a>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="numberOfPieces" className="col-sm-4 offset-sm-1 text-left">Број на парчиња</label>
                    <div className="col-sm-6">
                        <input type="number" className="form-control" id="numberOfPieces" name="numberOfPieces"
                               placeholder="Број на парчиња" value={job.numberOfPieces} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="startDate" name="startDate"
                               placeholder="Start Date" value={job.startDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="endDate" name="endDate"
                               placeholder="End Date" value={job.endDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="estimation" className="col-sm-4 offset-sm-1 text-left">Estimation</label>
                    <div className="col-sm-6">
                        <input type="number" className="form-control" id="estimation" name="estimation"
                               placeholder="Estimation" value={job.estimation} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            type="submit"
                            // disabled={!isInputValid}
                            className="btn btn-primary text-upper">
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            onClick={() => cancelGoBack()}
                            type="button"
                            className="btn btn-danger text-upper">
                            Cancel
                        </button>
                    </div>
                </div>

            </form>

        </div>
    );

};

export default JobEdit;