import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import SketchService from "../../../service/SketchService";
import JobService from "../../../service/JobService";

const JobAdd = (props) => {

    const history = useHistory();

    const sketchId = useParams().sketchId;

    const [sketch, setSketch] = useState({});

    useEffect(() => {
        SketchService.getSketchById(sketchId).then(response => {
            setSketch(response.data);
        })
    }, []);

    const emptyJob = {
        jobName: "",
        sketchId: sketchId,
        numberOfPieces: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        estimation: "",
        isFinished: false
    };

    const [job, setJob] = useState(emptyJob);

    const onFormSubmit = (e) => {
        e.preventDefault();

        const jobDTO = {
            job: job,
            sketchId: sketchId,
            startDate: job.startDate,
            startTime: job.startTime,
            endDate: job.endDate,
            endTime: job.endTime,
        };

        JobService.createJob(jobDTO).then(response => {
            history.push("/jobs");
        });
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
                            <a href={`/sketches/${sketchId}`}>{sketch.sketchName}</a>
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
                        <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                        <div className="col-sm-6 form-inline">
                            <input type="date" className="form-control" id="startDate" name="startDate"
                                   placeholder="Start Date" value={job.startDate} onChange={handleInputChange}/>
                            <input type="time" className="form-control" id="startTime" name="startTime" min="08:00:00"
                                   max="18:00:00"
                                   placeholder="Start Date" value={job.startTime} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                        <div className="col-sm-6 form-inline">
                            <input type="date" className="form-control" id="endDate" name="endDate"
                                   placeholder="End Date" value={job.endDate} onChange={handleInputChange}/>
                            <input type="time" className="form-control" id="endTime" name="endTime" min="08:00:00"
                                   max="18:00:00"
                                   placeholder="End Date" value={job.endTime} onChange={handleInputChange}/>
                            {/*       <div>*/}
                            {/*           Selected date and time: {job.endDate} + {job.startDate}*/}
                            {/*       </div>*/}
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="estimation" className="col-sm-4 offset-sm-1 text-left">Estimation</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" id="estimation" name="estimation"
                                   placeholder="Estimation" value={job.estimation} onChange={handleInputChange}/>
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

        </div>
    );

};

export default JobAdd;