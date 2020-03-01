import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import SketchService from "../../../service/SketchService";
import FileService from "../../../service/FileService";

const SketchDetails = (props) => {

    const history = useHistory();

    const sketchId = useParams().sketchId;

    const validation = {
        drawingNameError: "",
        sketchNameError: "",
        numberOfPiecesError: ""
    };

    const [sketch, setSketch] = useState({});
    const [validate, setValidate] = useState(validation);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        SketchService.getSketchById(sketchId).then(response => {
            setSketch(response.data);
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
        FileService.uploadFile(formData).then(response => {
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
                history.push(`/jobs`)
            })
        }

    };

    const cancelGoBack = () => {
        history.push("/jobs");
    };

    return (
        <div>
            <h4 className="text-upper text-left">Edit Sketch</h4>
            <form className="card" onSubmit={onEditSketch}>
                {showLoading &&
                <div className="alert alert-info" role="alert">
                    This is a info alert—check it out!
                </div>}
                <div className="form-group row">
                    <label htmlFor="drawing" className="col-sm-4 offset-sm-1 text-left">Drawing Code</label>
                    <div className="form-inline col-sm-6">
                        <input type="text" disabled className="form-control" id="drawing" name="drawing"
                               placeholder="Drawing code" value={sketch.drawing} onChange={handleInputChange}/>
                        <input type="text" disabled className="form-control" id="sketchName" name="sketchName"
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
                    <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                    <div className="col-sm-6">
                        {/*<a href={FileService.downloadFile(sketch.imageFilename, sketch.drawing)} download target="_blank">{sketch.imageFilename}</a>*/}
                        <input type="file" className="form-control" id="imageFilename" name="imageFilename"
                               placeholder="Image File" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="technologyFilename"
                           className="col-sm-4 offset-sm-1 text-left">Technology</label>
                    <div className="col-sm-6">
                        {/*<a href={FileService.downloadFile(sketch.technologyFilename, sketch.drawing)} download target="_blank">{sketch.technologyFilename}</a>*/}
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
                        {/*<a href={FileService.downloadFile(sketch.myTechnologyFilename, sketch.drawing)} download target="_blank">{sketch.myTechnologyFilename}</a>*/}
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
                        {/*<a href={FileService.downloadFile(sketch.measuringListFilename, sketch.drawing)} download target="_blank">{sketch.measuringListFilename}</a>*/}
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
                        {/*<a href={FileService.downloadFile(sketch.myMeasuringListFilename, sketch.drawing)} download target="_blank">{sketch.myMeasuringListFilename}</a>*/}
                        <input type="file" className="form-control" id="myMeasuringListFilename"
                               name="myMeasuringListFilename"
                               placeholder="My Measuring List" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <div
                        className="col-sm-4  text-center">
                        <button
                            type="submit"
                            disabled={showLoading}
                            className="btn btn-primary text-upper">
                            Update Sketch
                        </button>
                    </div>
                    <div className="col-sm-4  text-center">
                        {showLoading &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                    </div>

                    <div
                        className="col-sm-4  text-center">
                        <button
                            onClick={() => cancelGoBack()}
                            type="button"
                            className="btn btn-danger text-upper">
                            Назад кон налози
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default SketchDetails;