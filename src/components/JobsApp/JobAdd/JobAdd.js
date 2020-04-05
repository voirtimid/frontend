import React, {Fragment, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import SketchService from "../../../service/SketchService";
import JobService from "../../../service/JobService";
import {Link} from "react-router-dom";

const JobAdd = (props) => {

    const history = useHistory();

    const sketchId = useParams().sketchId;

    const emptyJob = {
        jobName: "",
        sketchId: sketchId,
        numberOfPieces: 0,
        totalTimeNeeded: 0,
        isFinished: false
    };

    const [job, setJob] = useState(emptyJob);
    const [sketch, setSketch] = useState({});

    useEffect(() => {
        SketchService.getSketchById(sketchId).then(response => {
            setSketch(response.data);
        })
    }, []);

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

    const onFormSubmit = (e) => {
        e.preventDefault();

        const numberOfHours = ((sketch.minutesForPiece * job.numberOfPieces) / 60);

        const jobToAdd = {
            ...job,
            estimatedHours: numberOfHours
        };

        const jobDTO = {
            job: jobToAdd,
            sketchId: sketchId
        };

        JobService.createJob(jobDTO).then(response => {
            const newJob = response.data;
            history.push(`/jobs/${newJob.jobId}/addTask`)
            // history.push("/jobs");
        });
    };

    return (
        <Fragment>
            <h4>Add Job</h4>
            <form className='card' encType='multipart/form-data' onSubmit={onFormSubmit}>
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="jobName" className="col-sm-4 offset-sm-1 text-left">Job Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="jobName" name="jobName"
                                   placeholder="Job Name" value={job.jobName} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="sketchName" className="col-sm-4 offset-sm-1 text-left">Sketch Name</label>
                        <div className="col-sm-6">
                            <Link to={`/sketches/${sketchId}`}>{sketch.sketchName}</Link>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="numberOfPieces" className="col-sm-4 offset-sm-1 text-left">Број на
                            парчиња</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" id="numberOfPieces" name="numberOfPieces"
                                   placeholder="Број на парчиња" value={job.numberOfPieces}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="totalTimeNeeded" className="col-sm-4 offset-sm-1 text-left">Потребно време во минути</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" id="totalTimeNeeded" name="totalTimeNeeded"
                                   placeholder="Потребно време" value={sketch.minutesForPiece * job.numberOfPieces}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

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
                </div>

            </form>

        </Fragment>
    );

};

export default JobAdd;
