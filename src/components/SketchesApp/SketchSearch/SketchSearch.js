import React, {useState} from "react";
import SketchService from "../../../service/SketchService";
import {useHistory} from "react-router";
import FileUploadService from "../../../service/FileUploadService";

const SketchSearch = (props) => {

    const history = useHistory();

    // const emptySketch = {
    //     sketchName: "",
    //     companyName: "",
    //     companyInfo: "",
    //     imageFilename: "",
    //     technologyFilename: "",
    //     myTechnologyFilename: "",
    //     measuringListFilename: "",
    //     myMeasuringListFilename: "",
    //     gcodeFilename: "",
    //     usedTools: ""
    // };

    const [sketchName, setSketchName] = useState("");
    const [sketch, setSketch] = useState({});
    const [exist, setExist] = useState(false);


    const onFormSubmit = (e) => {
        e.preventDefault();

        SketchService.getSketchByName(sketchName).then(response => {
            const sketch = response.data;
            // console.log(sketch);
            if (sketch === "") {
                alert("Не постои цртеж со ова име. Креирајте нов цртеж");
                // const newSketch = {
                //     ...emptySketch,
                //     sketchName: sketchName
                // };
                // setSketch(newSketch);
                // setExist(true);
                history.push(`/sketches/new/` + sketchName)
            } else {
                setSketch(sketch);
                setExist(true);
            }
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

        FileUploadService.uploadFile(formData, sketch.sketchName).then(response => {
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

        SketchService.updateSketch(sketch.sketchId, sketch).then(response => {
            console.log(response.data);
            history.push(`/sketches/${response.data.sketchId}/new`)
        })

    };

    let editSketch = (
        <div>
            <h4 className="text-upper text-left">Edit Sketch</h4>
            <form className="card" onSubmit={onEditSketch}>
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

                <br />
                <hr />

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
                        {sketch.technologyFilename}
                        <input type="file" className="form-control" id="technologyFilename" name="technologyFilename"
                               placeholder="Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="myTechnologyFilename" className="col-sm-4 offset-sm-1 text-left">My Technology</label>
                    <div className="col-sm-6">
                        {sketch.myTechnologyFilename}
                        <input type="file" className="form-control" id="myTechnologyFilename" name="myTechnologyFilename"
                               placeholder="My Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="measuringListFilename" className="col-sm-4 offset-sm-1 text-left">Measuring List</label>
                    <div className="col-sm-6">
                        {sketch.measuringListFilename}
                        <input type="file" className="form-control" id="measuringListFilename" name="measuringListFilename"
                               placeholder="Measuring List" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="myMeasuringListFilename" className="col-sm-4 offset-sm-1 text-left">My Measuring List</label>
                    <div className="col-sm-6">
                        {sketch.myMeasuringListFilename}
                        <input type="file" className="form-control" id="myMeasuringListFilename" name="myMeasuringListFilename"
                               placeholder="My Measuring List" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="gcodeFilename" className="col-sm-4 offset-sm-1 text-left">GCode File</label>
                    <div className="col-sm-6">
                        {sketch.gcodeFilename}
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
                            Update Sketch and continue with creating job
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

    const handleInputChangeSearch = (event) => {
        setSketchName(event.target.value);
    };

    return (
        <div>
            <h4>Пребарај цртеж</h4>

            <form onSubmit={onFormSubmit}>
                <input type="text" name="sketchName" id="sketchName" placeholder="Име на цртеж" onChange={handleInputChangeSearch} value={sketchName}/>
                <input type="submit" value="Пребарај"/>
            </form>

            <br />
            <a href={"/sketches/new"}>Креирај нов цртеж</a>
            <br />

            <br />
            {exist && editSketch}
        </div>
    );

};

export default SketchSearch;