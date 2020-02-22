import React, {useState} from "react";
import {useHistory} from "react-router";
import FileUploadService from "../../../service/FileUploadService";
import SketchService from "../../../service/SketchService";

const SketchAdd = (props) => {

    const history = useHistory();

    const emptySketch = {
        sketchName: "",
        companyName: "",
        companyInfo: "",
        imageFilename: "",
        technologyFilename: "",
        myTechnologyFilename: "",
        measuringListFilename: "",
        myMeasuringListFilename: "",
        gcodeFilename: "",
        usedTools: ""
    };

    const [sketch, setSketch] = useState(emptySketch);

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

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

        FileUploadService.uploadFile(formData).then(response => {
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

    const onFormSubmit = (e) => {
        e.preventDefault();

        SketchService.createNewSketch(sketch).then(response => {
            const newSketch = response.data;
            history.push(`/sketches/${newSketch.sketchId}`)
        });
    };

    return (
        <div>
            <h4 className="text-upper text-left">Create new Sketch</h4>
            <form className="card" onSubmit={onFormSubmit}>
                <div className="form-group row">
                    <label htmlFor="sketchName" className="col-sm-4 offset-sm-1 text-left">Sketch Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="sketchName" name="sketchName"
                               placeholder="Sketch Name" value={sketch.sketchName} onChange={handleInputChange}/>
                    </div>
                </div>
                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="companyName" className="col-sm-4 offset-sm-1 text-left">Company Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="companyName" name="companyName"
                               placeholder="Company Name" value={sketch.companyName} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="companyInfo" className="col-sm-4 offset-sm-1 text-left">Company Info</label>
                    <div className="col-sm-6">
                        <textarea className="form-control" id="companyInfo" name="companyInfo"
                                  placeholder="Company Info" value={sketch.companyInfo} onChange={handleInputChange} />
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                    <div className="col-sm-6">
                        {sketch.imageFilename}
                        <input type="file" className="form-control" id="imageFilename" name="imageFilename"
                               placeholder="Image File" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="technologyFilename" className="col-sm-4 offset-sm-1 text-left">Technology</label>
                    <div className="col-sm-6">
                        {sketch.technologyFilename === "" || "No file yet. Upload file"}
                        <input type="file" className="form-control" id="technologyFilename" name="technologyFilename"
                               placeholder="Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="myTechnologyFilename" className="col-sm-4 offset-sm-1 text-left">My Technology</label>
                    <div className="col-sm-6">
                        {sketch.myTechnologyFilename === "" || "No file yet. Upload file"}
                        <input type="file" className="form-control" id="myTechnologyFilename" name="myTechnologyFilename"
                               placeholder="My Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="measuringListFilename" className="col-sm-4 offset-sm-1 text-left">Measuring List</label>
                    <div className="col-sm-6">
                        {sketch.measuringListFilename === "" || "No file yet. Upload file"}
                        <input type="file" className="form-control" id="measuringListFilename" name="measuringListFilename"
                               placeholder="Measuring List" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="myMeasuringListFilename" className="col-sm-4 offset-sm-1 text-left">My Measuring List</label>
                    <div className="col-sm-6">
                        {sketch.myMeasuringListFilename === "" || "No file yet. Upload file"}
                        <input type="file" className="form-control" id="myMeasuringListFilename" name="myMeasuringListFilename"
                               placeholder="My Measuring List" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="gcodeFilename" className="col-sm-4 offset-sm-1 text-left">GCode File</label>
                    <div className="col-sm-6">
                        {sketch.gcodeFilename === "" || "No file yet. Upload file"}
                        <input type="file" className="form-control" id="gcodeFilename" name="gcodeFilename"
                               placeholder="GCode File" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="usedTools" className="col-sm-4 offset-sm-1 text-left">Used Tools</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="usedTools" name="usedTools"
                               placeholder="Used Tools" value={sketch.usedTools} onChange={handleInputChange}/>
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
                            Create new Sketch
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );

};

export default SketchAdd;