import React, {useEffect, useState} from "react";
import SketchService from "../../../service/SketchService";
import {useHistory} from "react-router";
import FileService from "../../../service/FileService";
import "./SketchSearch.css"
import {Constants} from "../../../Constants/Constants";
import {Link} from "react-router-dom";
import Job from "../../JobsApp/Job/Job";
import JobService from "../../../service/JobService";

const SketchSearch = (props) => {

    const history = useHistory();

    const validation = {
        sketchNameError: ""
    };

    const [sketchName, setSketchName] = useState("");
    const [validate, setValidate] = useState(validation);
    const [sketches, setSketches] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [sketch, setSketch] = useState({});
    const [exist, setExist] = useState(false);
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        SketchService.getAllSketches().then(response => {
            setSketches(response.data);
        })
    }, []);

    const isValid = () => {
        let sketchNameError = "";
        if (!sketch.sketchName) {
            sketchNameError = "Sketch name is not entered";
        }
        if (sketchNameError) {
            setValidate({
                ...validation,
                sketchNameError: sketchNameError
            });
            return false;
        }
        return true;
    };

    const suggestionSelected = (value) => {
        setSketchName(value);
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

        FileService.uploadFile(formData, sketch.sketchName).then(response => {
            alert('File Upload Successfully');
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
                console.log(response.data);
                history.push(`/sketches/${response.data.sketchId}/new`)
            })
        }
    };

    const jobsWithSketch = jobs.map(job => <Job key={job.jobId} job={job} onDelete={props.onDelete} />);

    let editSketch = (
        <div>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Edit Sketch</h4>
                    <form onSubmit={onEditSketch}>
                        <div className="form-group row">
                            <div
                                className="offset-sm-1 col-sm-3  text-center">
                                <button
                                    type="submit"
                                    // disabled={!isInputValid}
                                    className="btn btn-primary text-upper">
                                    Continue with this Sketch
                                </button>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="sketchName" className="col-sm-4 offset-sm-1 text-left">Sketch Name</label>
                            <div className="col-sm-6">
                                <div style={{fontSize: 12, color: "red"}}>
                                    {validate.sketchNameError}
                                </div>
                                <input type="text" disabled className="form-control" id="sketchName" name="sketchName"
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
                            <label htmlFor="minutesForPiece" className="col-sm-4 offset-sm-1 text-left">Потребно време
                                за изработка во минути</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control" id="minutesForPiece"
                                       name="minutesForPiece"
                                       placeholder="Piece in minute" value={sketch.minutesForPiece}
                                       onChange={handleInputChange}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                            <div className="col-sm-6">
                                <a href={Constants.getFilePath(sketchName, sketch.imageFilename)} target="_blank">{sketch.imageFilename}</a>
                                <input type="file" className="form-control" id="imageFilename" name="imageFilename"
                                       placeholder="Image File" onChange={onFileChangeHandler}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="technologyFilename"
                                   className="col-sm-4 offset-sm-1 text-left">Technology</label>
                            <div className="col-sm-6">
                                <a href={Constants.getFilePath(sketchName, sketch.technologyFilename)} target="_blank">{sketch.technologyFilename}</a>
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
                                {sketch.myTechnologyFilename}
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
                                {sketch.measuringListFilename}
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
                                {sketch.myMeasuringListFilename}
                                <input type="file" className="form-control" id="myMeasuringListFilename"
                                       name="myMeasuringListFilename"
                                       placeholder="My Measuring List" onChange={onFileChangeHandler}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="gcodeFilename" className="col-sm-4 offset-sm-1 text-left">GCode File</label>
                            <div className="col-sm-6">
                                {sketch.gcodeFilename}
                                <input type="file" className="form-control" id="gcodeFilename" name="gcodeFilename"
                                       placeholder="GCode File" onChange={onFileChangeHandler}/>
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
                                    Update Sketch and continue with creating job
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

            {jobs &&
            <div className="table-responsive">
                <table className="table tr-history table-striped small">
                    <thead>
                    <tr>
                        <th scope="col">Job Name</th>
                        <th scope="col">Sketch Name</th>
                        <th scope="col">Start date</th>
                        <th scope="col">End date</th>
                        <th scope="col">Estimated hours</th>
                        <th scope="col">Number of pieces</th>
                        <th scope="col">Time for a Piece</th>
                        <th scope="col">Status</th>
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
        setSketchName(value);

        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`${value}`, 'i');
            suggestions = sketches.sort().filter(sketch => regex.test(sketch.sketchName));
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
                                               onClick={() => suggestionSelected(item.sketchName)}>{item.sketchName}</li>)}
            </ul>
        );
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        SketchService.getSketchByName(sketchName).then(response => {
            const sketch = response.data;
            // console.log(sketch);
            if (sketch === "") {
                alert("Не постои цртеж со ова име. Креирајте нов цртеж");
                history.push(`/sketches/new/` + sketchName)
            } else {
                setSketch(sketch);
                setExist(true);
                JobService.getJobsWithSketch(response.data.sketchName).then(response => {
                    setJobs(response.data);
                })
            }
        });
    };

    return (
        <div>
            <h4>Проект</h4>

            <form onSubmit={onFormSubmit} className="AutoCompleteText">
                <input type="search" name="sketchName" id="sketchName" placeholder="Број на цртеж"
                       onChange={handleInputChangeSearch} value={sketchName}/>
                {renderSuggestions()}
                <input type="submit" value="Пребарај"/>
            </form>

            <br/>
            <Link to={"/sketches/new"}>
                Креирај нов цртеж
            </Link>
            {/*<a href={"/sketches/new"}></a>*/}
            <br/>

            <br/>
            {exist && editSketch}
        </div>
    );

};

export default SketchSearch;