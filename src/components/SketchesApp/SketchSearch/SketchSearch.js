import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import "./SketchSearch.css"
import JobSearch from "../../JobsApp/JobSearch/JobSeaerch";
import SketchService from "../../../service/SketchService";
import FileService from "../../../service/FileService";
import JobService from "../../../service/JobService";
import {Constants} from "../../../Constants/Constants";

const SketchSearch = (props) => {

    const history = useHistory();

    const validation = {
        drawingNameError: "",
        sketchNameError: "",
        numberOfPiecesError: ""
    };

    const [drawing, setDrawing] = useState("");
    const [validate, setValidate] = useState(validation);
    const [sketches, setSketches] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [sketch, setSketch] = useState({});
    const [exist, setExist] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {
        SketchService.getAllSketches().then(response => {
            setSketches(response.data);
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
        if (!sketch.numberOfPieces) {
            numberOfPiecesError = "Enter number of pieces";
        }
        if (drawingNameError || sketchNameError || numberOfPiecesError) {
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

    const suggestionSelected = (value) => {
        setDrawing(value);
        setSuggestions([]);
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

        const changedSketch = {
            ...sketch,
            [name]: value
        };

        setSketch(changedSketch);
    };

    const onFileChangeHandler = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        setShowLoading(true);
        FileService.uploadFile(formData, sketch.sketchName).then(response => {
            setShowLoading(false);
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

    const onEditSketch = (e) => {
        e.preventDefault();

        if (isValid()) {
            SketchService.updateSketch(sketch.sketchId, sketch).then(response => {
                const newSketch = response.data;

                const jobToAdd = {
                    jobName: newSketch.drawing + " " + newSketch.sketchName,
                    numberOfPieces: sketch.numberOfPieces
                };

                const jobDTO = {
                    job: jobToAdd,
                    sketchId: newSketch.sketchId
                };

                JobService.createJob(jobDTO).then(response => {
                    const newJob = response.data;
                    history.push(`/jobs/${newJob.jobId}/addTask`)
                });
            })
        }
    };

    const jobsWithSketch = jobs.map(job => <JobSearch key={job.jobId} job={job} />);

    const createNewVersion = () => {
        history.push("/sketches/new/version/" + drawing);
    };

    let editSketch = (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Enter number of pieces and edit Sketch</h4>
                    <form onSubmit={onEditSketch}>
                        <div className="form-group row">
                            <div className="col-sm-3  text-center">
                                <button
                                    type="submit"
                                    disabled={exist === false || showLoading}
                                    className="btn btn-primary text-upper">
                                    Continue with this Sketch
                                </button>
                            </div>
                            {showLoading &&
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>}
                            <div className="col-sm-3  text-center">
                                <button type="button"
                                        className="btn btn-primary"
                                        disabled={exist === false || showLoading}
                                        onClick={() => createNewVersion()}>
                                    Create new version

                                </button>
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
                                       placeholder="Number of pieces" min="1" value={sketch.numberOfPieces}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <hr/>

                        <div style={{fontSize: 12, color: "red"}}>
                            {validate.drawingNameError}
                        </div>
                        <div className="form-group row">
                            <label htmlFor="drawing" className="col-sm-4 offset-sm-1 text-left">Drawing Code</label>
                            <div className="form-inline col-sm-6">
                                <input type="text" className="form-control" disabled id="drawing" name="drawing"
                                       placeholder="Drawing code" value={sketch.drawing} onChange={handleInputChange}/>
                                <input type="text" className="form-control" disabled id="sketchName" name="sketchName"
                                       placeholder="Sketch Name" value={sketch.sketchName}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="companyName" className="col-sm-4 offset-sm-1 text-left">Company Name</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="companyName" name="companyName"
                                       placeholder="Company Name" value={sketch.companyName}
                                       onChange={handleInputChange}/>
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
                            <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                            <div className="col-sm-6">
                                <a href={Constants.getFilePath(sketch.drawing, sketch.imageFilename)} download target="_blank">{sketch.imageFilename}</a>
                                <input type="file" className="form-control" id="imageFilename" name="imageFilename"
                                       placeholder="Image File" onChange={onFileChangeHandler}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="technologyFilename"
                                   className="col-sm-4 offset-sm-1 text-left">Technology</label>
                            <div className="col-sm-6">
                                <a href={Constants.getFilePath(sketch.drawing, sketch.technologyFilename)} download target="_blank">{sketch.technologyFilename}</a>
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
                                <a href={Constants.getFilePath(sketch.drawing, sketch.myTechnologyFilename)} download target="_blank">{sketch.myTechnologyFilename}</a>
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
                                <a href={Constants.getFilePath(sketch.drawing, sketch.measuringListFilename)} download target="_blank">{sketch.measuringListFilename}</a>
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
                                <a href={Constants.getFilePath(sketch.drawing, sketch.myMeasuringListFilename)} download target="_blank">{sketch.myMeasuringListFilename}</a>
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
                                    disabled={exist === false || showLoading}
                                    className="btn btn-primary text-upper">
                                    Update Sketch and continue the procedure
                                </button>

                                {showLoading &&
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>}
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {jobs &&
            <div className="table-responsive">
                <table className="table table-bordered table-hover small">
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
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobsWithSketch}
                    </tbody>
                </table>
            </div>
            }

        </div>
    );

    const handleInputChangeSearch = (event) => {
        const value = event.target.value;
        setDrawing(value);

        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, 'i');
            suggestions = sketches.sort().filter(sketch => regex.test(sketch.drawing));
        }
        setSuggestions(suggestions);
    };

    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item.sketchId}
                                               onClick={() => suggestionSelected(item.drawing)}>{item.drawing}</li>)}
            </ul>
        );
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        SketchService.getSketchByName(drawing).then(response => {
            const sketch = response.data;
            // console.log(sketch);
            if (sketch === "") {
                alert("Не постои цртеж со ова име. Креирајте нов цртеж");
                history.push(`/sketches/new/` + drawing)
            } else {
                setSketch(sketch);
                setExist(true);
                JobService.getJobsWithSketch(response.data.drawing).then(response => {
                    setJobs(response.data);
                })
            }
        });
    };

    return (
        <div>
            <h4>Проект</h4>

            <form onSubmit={onFormSubmit} className="AutoCompleteText">
                <input type="search" name="drawing" id="drawing" placeholder="Број на цртеж"
                       onChange={handleInputChangeSearch} value={drawing}/>
                {renderSuggestions()}
                <input type="submit" value="Пребарај"/>
            </form>

            <br/>
            <Link to={"/sketches/new"} className="btn btn-secondary">
                Креирај нов проект
            </Link>
            <br/>

            <br/>
            {editSketch}
        </div>
    );

};

export default SketchSearch;