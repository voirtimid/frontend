import React, {useState} from "react";
import {useHistory} from "react-router";
import FileUploadService from "../../../service/FileUploadService";

const JobAdd = (props) => {

    const history = useHistory();

    const emptyJob = {
        jobName: "",
        committeeName: "",
        theirClaimId: "",
        theirTechnology: "",
        myTechnology: "",
        image: "",
        materials: "",
        tasks: [],
        startDate: "",
        endDate: "",
        estimation: ""
    };

    const [job, setJob] = useState(emptyJob);

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onCreate(job);
        history.push("/jobs");
        console.log(job);
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

    const onFileChangeHandler = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        FileUploadService.uploadFile(formData).then(response => {
            alert('File Upload Successfully');
        });

        const target = e.target;
        const name = target.name;
        const value = target.value;

        let parts = value.split("\\");
        let fileName = parts[parts.length - 1];

        const changedJob = {
            ...job,
            [name]: fileName
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

                <div className="form-group row">
                    <label htmlFor="committeeName" className="col-sm-4 offset-sm-1 text-left">Committee Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="committeeName" name="committeeName"
                               placeholder="Committee Name" value={job.committeeName} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="theirClaimId" className="col-sm-4 offset-sm-1 text-left">Their Claim Id</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="theirClaimId" name="theirClaimId"
                               placeholder="Their Claim Id" value={job.theirClaimId} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="theirTechnology" className="col-sm-4 offset-sm-1 text-left">Their Technology</label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="theirTechnology" name="theirTechnology"
                               placeholder="Their Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="myTechnology" className="col-sm-4 offset-sm-1 text-left">My Technology</label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="myTechnology" name="myTechnology"
                               placeholder="My Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="startDate" name="startDate"
                               placeholder="Start Date" value={job.startDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="endDate" name="endDate"
                               placeholder="End Date" value={job.endDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="estimation" className="col-sm-4 offset-sm-1 text-left">Estimation</label>
                    <div className="col-sm-6">
                        <input type="number" className="form-control" id="estimation" name="estimation"
                               placeholder="Estimation" value={job.estimation} onChange={handleInputChange}/>
                    </div>
                </div>


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

export default JobAdd;