import React, {Fragment, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import FileService from "../../../service/FileService";
import SketchService from "../../../service/SketchService";
import JobService from "../../../service/JobService";
import FileDownload from "js-file-download";

const SketchesNewVersion = (props) => {

    const history = useHistory();

    const drawing = useParams().drawing;

    const validation = {
        drawingNameError: "",
        sketchNameError: "",
        numberOfPiecesError: ""
    };

    const [sketch, setSketch] = useState({});
    const [tempName, setTempName] = useState("");
    const [validate, setValidate] = useState(validation);
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [numberOfPieces, setNumberOfPieces] = useState(0);

    useEffect(() => {
        SketchService.getSketchByName(drawing).then(response => {
            setSketch(response.data);
            setTempName(response.data.drawing + "_temporary");
            FileService.copyDirectory(response.data.drawing, response.data.drawing + "_temporary").then(response => {

            });
        })
    }, []);

    const isValid = () => {
        let drawingNameError = "";
        let sketchNameError = "";
        let numberOfPiecesError = "";
        if (!sketch.drawing) {
            drawingNameError = "Drawing is not entered";
        }
        if (!sketch.sketchName) {
            sketchNameError = "Sketch name is not entered";
        }
        if (!numberOfPieces) {
            numberOfPiecesError = "Enter number of pieces";
        }
        if (drawingNameError || sketchNameError) {
            setValidate({
                ...validation,
                drawingNameError: drawingNameError,
                sketchNameError: sketchNameError,
                numberOfPiecesError: numberOfPiecesError
            });
            return false;
        }
        return true;
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        if (name === "numberOfPieces") {
            setNumberOfPieces(value);
        } else {

            const changedSketch = {
                ...sketch,
                [name]: value
            };

            setSketch(changedSketch);
        }
    };

    const onFileChangeHandler = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        setShowLoading(true);
        FileService.uploadFile(formData, tempName).then(response => {
            setShowLoading(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 5000);
        }).catch(reason => {
            alert(`REASON ${reason}`);
        });

        const target = e.target;
        const name = target.name;
        const value = target.value;

        let parts = value.split("\\");
        let fileName = parts[parts.length - 1];

        const changedSketch = {
            ...sketch,
            [name]: fileName
        };

        setSketch(changedSketch);

    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        const sketchToSave = {
            ...sketch,
            sketchId: ""
        };

        if (isValid()) {
            SketchService.createNewSketch(sketchToSave).then(response => {
                const newSketch = response.data;

                const jobToAdd = {
                    jobName: newSketch.drawing + " " + newSketch.sketchName,
                    numberOfPieces: numberOfPieces
                };

                const jobDTO = {
                    job: jobToAdd,
                    sketchId: newSketch.sketchId
                };

                FileService.renameDirectory(tempName, newSketch.drawing).then();

                JobService.createJob(jobDTO).then(response => {
                    const newJob = response.data;
                    history.push(`/jobs/${newJob.jobId}/addTask`)
                });
            });
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Create new Sketch</h4>

                <form onSubmit={onFormSubmit}>
                    {showAlert &&
                    <div className="alert alert-info" role="alert">
                        The file is uploaded!
                    </div>}
                    <hr/>
                    <div style={{fontSize: 12, color: "red"}}>
                        {validate.drawingNameError}
                    </div>
                    <div className="form-group row">
                        <label htmlFor="drawing" className="col-sm-4 offset-sm-1 text-left">Drawing Code</label>
                        <div className="form-inline col-sm-6">
                            <input type="text" className="form-control" id="drawing" name="drawing"
                                   placeholder="Drawing code" value={sketch.drawing} onChange={handleInputChange}/>
                            <input type="text" className="form-control" id="sketchName" name="sketchName"
                                   placeholder="Sketch Name" value={sketch.sketchName} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="companyName" className="col-sm-4 offset-sm-1 text-left">Company Name</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="companyName" name="companyName"
                                   placeholder="Company Name" value={sketch.companyName} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="companyInfo" className="col-sm-4 offset-sm-1 text-left">Company Info</label>
                        <div className="col-sm-6">
                        <textarea className="form-control" id="companyInfo" name="companyInfo"
                                  placeholder="Company Info" value={sketch.companyInfo} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="usedTools" className="col-sm-4 offset-sm-1 text-left">Used Tools</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="usedTools" name="usedTools"
                                   placeholder="Used Tools" value={sketch.usedTools} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="numberOfPieces" className="col-sm-4 offset-sm-1 text-left">Number of
                            pieces</label>
                        <div className="col-sm-6">
                            <div style={{fontSize: 12, color: "red"}}>
                                {validate.numberOfPiecesError}
                            </div>
                            <input type="number" className="form-control" id="numberOfPieces" name="numberOfPieces"
                                   placeholder="Number of pieces" min="1" value={numberOfPieces}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(sketch.imageFilename, sketch.drawing).then(response => {
                                FileDownload(response.data, sketch.imageFilename);
                            })}>{sketch.imageFilename}</button>
                            <input type="file" className="form-control" id="imageFilename" name="imageFilename"
                                   placeholder="Image File" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="technologyFilename"
                               className="col-sm-4 offset-sm-1 text-left">Technology</label>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(sketch.technologyFilename, sketch.drawing).then(response => {
                                FileDownload(response.data, sketch.technologyFilename);
                            })}>{sketch.technologyFilename}</button>
                            <input type="file" className="form-control" id="technologyFilename"
                                   name="technologyFilename"
                                   placeholder="Technology" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="myTechnologyFilename" className="col-sm-4 offset-sm-1 text-left">My
                            Technology</label>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(sketch.myTechnologyFilename, sketch.drawing).then(response => {
                                FileDownload(response.data, sketch.myTechnologyFilename);
                            })}>{sketch.myTechnologyFilename}</button>
                            <input type="file" className="form-control" id="myTechnologyFilename"
                                   name="myTechnologyFilename"
                                   placeholder="My Technology" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="measuringListFilename" className="col-sm-4 offset-sm-1 text-left">Measuring
                            List</label>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(sketch.measuringListFilename, sketch.drawing).then(response => {
                                FileDownload(response.data, sketch.measuringListFilename);
                            })}>{sketch.measuringListFilename}</button>
                            <input type="file" className="form-control" id="measuringListFilename"
                                   name="measuringListFilename"
                                   placeholder="Measuring List" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="myMeasuringListFilename" className="col-sm-4 offset-sm-1 text-left">My
                            Measuring
                            List</label>
                        <div className="col-sm-6">
                            <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(sketch.myMeasuringListFilename, sketch.drawing).then(response => {
                                FileDownload(response.data, sketch.myMeasuringListFilename);
                            })}>{sketch.myMeasuringListFilename}</button>
                            <input type="file" className="form-control" id="myMeasuringListFilename"
                                   name="myMeasuringListFilename"
                                   placeholder="My Measuring List" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <div
                            className="offset-sm-1 col-sm-3  text-center">
                            <button
                                type="submit"
                                disabled={showLoading || sketch.drawing === drawing}
                                className="btn btn-primary text-upper">
                                Next step
                            </button>
                        </div>
                        <Fragment>
                            {showLoading &&
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>}
                        </Fragment>
                    </div>

                </form>
            </div>
        </div>
    );

};

export default SketchesNewVersion;
