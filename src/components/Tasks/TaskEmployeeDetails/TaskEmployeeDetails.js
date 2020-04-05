import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import TaskService from "../../../service/TaskService";
import FileService from "../../../service/FileService";
import moment from "moment";
import FileDownload from 'js-file-download';
import SketchService from "../../../service/SketchService";

const TaskEmployeeDetails = (props) => {

    const history = useHistory();

    const taskId = useParams().taskId;

    const [task, setTask] = useState({});
    const [employee, setEmployee] = useState({});
    const [machine, setMachine] = useState({});
    const [sketch, setSketch] = useState({});
    const [cnc, setCnc] = useState({});
    let cncFileContent;

    useEffect(() => {
        TaskService.getTask(taskId).then(response => {
            const task = response.data;
            setTask(task);
            setEmployee(task.employee);
            setMachine(task.machine);
            setCnc(task.cncCode);
            FileService.readFile(task.cncCode.cncId).then(response => {
                cncFileContent = response.data;
            });
            SketchService.getSketchByName(task.taskName.split(" ")[0]).then(response => {
                setSketch(response.data)
            });
        })
    }, []);

    const cancelGoBack = () => {
        history.push(`/employees/${employee.employeeId}/tasks`);
    };

    const startWorking = () => {
        TaskService.startWorkingOnTask(taskId).then(response => {
            setTask(response.data);
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Task: {task.taskName}</h4>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Employee for the task</label>
                    <div className="col-sm-6">
                        {employee.firstName} {employee.lastName}
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Machine for the task</label>
                    <div className="col-sm-6">
                        {machine.name} - {machine.shortName}
                    </div>
                </div>

                <hr/>

                <p>
                    <button className="btn btn-primary" type="button" data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="false" aria-controls="collapseExample">
                        Show Sketch (Project)
                    </button>
                </p>


                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        <div className="form-group row">
                            <label htmlFor="drawing" className="col-sm-4 offset-sm-1 text-left">Drawing Code</label>
                            <div className="form-inline col-sm-6">
                                <input type="text" disabled className="form-control" id="drawing" name="drawing"
                                       placeholder="Drawing code" value={sketch.drawing}/>
                                <input type="text" disabled className="form-control" id="sketchName" name="sketchName"
                                       placeholder="Sketch Name" value={sketch.sketchName}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="companyName" className="col-sm-4 offset-sm-1 text-left">Company Name</label>
                            <div className="col-sm-6">
                                <input disabled type="text" className="form-control" id="companyName" name="companyName"
                                       placeholder="Company Name" value={sketch.companyName}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="companyInfo" className="col-sm-4 offset-sm-1 text-left">Company Info</label>
                            <div className="col-sm-6">
                        <textarea disabled className="form-control" id="companyInfo" name="companyInfo"
                                  placeholder="Company Info" value={sketch.companyInfo}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="usedTools" className="col-sm-4 offset-sm-1 text-left">Used Tools</label>
                            <div className="col-sm-6">
                                <input disabled type="text" className="form-control" id="usedTools" name="usedTools"
                                       placeholder="Used Tools" value={sketch.usedTools}/>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="imageFilename" className="col-sm-4 offset-sm-1 text-left">Image File</label>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-link"
                                        onClick={() => FileService.downloadFile(sketch.imageFilename, sketch.drawing).then(response => {
                                            FileDownload(response.data, sketch.imageFilename);
                                        })}>{sketch.imageFilename}</button>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="technologyFilename"
                                   className="col-sm-4 offset-sm-1 text-left">Technology</label>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-link"
                                        onClick={() => FileService.downloadFile(sketch.technologyFilename, sketch.drawing).then(response => {
                                            FileDownload(response.data, sketch.technologyFilename);
                                        })}>{sketch.technologyFilename}</button>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="myTechnologyFilename" className="col-sm-4 offset-sm-1 text-left">My
                                Technology</label>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-link"
                                        onClick={() => FileService.downloadFile(sketch.myTechnologyFilename, sketch.drawing).then(response => {
                                            FileDownload(response.data, sketch.myTechnologyFilename);
                                        })}>{sketch.myTechnologyFilename}</button>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="measuringListFilename" className="col-sm-4 offset-sm-1 text-left">Measuring
                                List</label>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-link"
                                        onClick={() => FileService.downloadFile(sketch.measuringListFilename, sketch.drawing).then(response => {
                                            FileDownload(response.data, sketch.measuringListFilename);
                                        })}>{sketch.measuringListFilename}</button>
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <label htmlFor="myMeasuringListFilename" className="col-sm-4 offset-sm-1 text-left">My
                                Measuring
                                List</label>
                            <div className="col-sm-6">
                                <button type="button" className="btn btn-link"
                                        onClick={() => FileService.downloadFile(sketch.myMeasuringListFilename, sketch.drawing).then(response => {
                                            FileDownload(response.data, sketch.myMeasuringListFilename);
                                        })}>{sketch.myMeasuringListFilename}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code file</label>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-link"
                                onClick={() => FileService.downloadFile(cnc.cncFilename, "cnc").then(response => {
                                    FileDownload(response.data, cnc.cncFilename);
                                })}>{cnc.cncFilename}</button>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code content</label>
                    <div className="col-sm-6">
                        <textarea readOnly rows="10" cols="50" value={cncFileContent}/>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="plannedHours" className="col-sm-4 offset-sm-1 text-left">Planned Working
                        hours</label>
                    <div className="col-sm-3">
                        <input type="text" disabled className="form-control" id="plannedHours" name="plannedHours"
                               placeholder="Actual Working hours" value={task.plannedHours}/>
                    </div>
                    <br/>
                    <label htmlFor="totalWorkTime" className="col-sm-4 offset-sm-1 text-left">Actual Working
                        hours</label>
                    <div className="col-sm-3">
                        <input type="text" disabled className="form-control" id="totalWorkTime" name="totalWorkTime"
                               placeholder="Actual Working hours" value={task.totalWorkTime}/>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="minutesForPiece" className="col-sm-4 offset-sm-1 text-left">Minutes for
                        piece</label>
                    <div className="col-sm-3">
                        <input type="text" disabled className="form-control" id="minutesForPiece"
                               name="minutesForPiece"
                               placeholder="Real Minutes for piece" value={task.minutesForPiece}/>
                    </div>
                    <br/>
                    <label htmlFor="realMinutesForPiece" className="col-sm-4 offset-sm-1 text-left">Real Minutes for
                        piece</label>
                    <div className="col-sm-3">
                        <input type="text" disabled className="form-control" id="realMinutesForPiece"
                               name="realMinutesForPiece"
                               placeholder="Real Minutes for piece"
                               value={task.realMinutesForPiece}/>
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="plannedStartDate" className="col-sm-4 offset-sm-1 text-left">Planned Start
                        Date</label>
                    <div className="col-sm-6">
                        {moment(task.plannedStartDate).format("DD-MMM-YYYY")}
                    </div>
                    <br/>
                    <label htmlFor="realStartDate" className="col-sm-4 offset-sm-1 text-left">Actual Start Date</label>
                    <div className="col-sm-6">
                        {(task.realStartDate && moment(task.realStartDate).format("DD-MMM-YYYY")) || "Not yet started"}
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="plannedEndDate" className="col-sm-4 offset-sm-1 text-left">Planned End Date</label>
                    <div className="col-sm-6">
                        {moment(task.plannedEndDate).format("DD-MMM-YYYY")}
                    </div>
                    <br/>
                    <label htmlFor="realEndDate" className="col-sm-4 offset-sm-1 text-left">Actual End Date</label>
                    <div className="col-sm-6">
                        {(task.realEndDate && moment(task.realEndDate).format("DD-MMM-YYYY")) || "Not yet finished"}
                    </div>
                </div>

                <hr/>

                <div className="form-group row">
                    <label htmlFor="comment" className="col-sm-4 offset-sm-1 text-left">General comment</label>
                    <div className="col-sm-6">
                        <textarea className="form-control" id="comment" name="comment"
                                  placeholder="General comment" value={task.comment}/>
                    </div>
                </div>

                <hr/>

                <div className="row">

                    <div
                        className="col-sm-3  text-center">
                        <button
                            onClick={() => cancelGoBack()}
                            type="button"
                            className="btn btn-danger text-upper">
                            Go Back
                        </button>

                    </div>
                    <div
                        className="col-sm-9  text-center">
                        <button
                            onClick={() => startWorking()}
                            type="button"
                            className="btn btn-secondary text-upper">
                            {(task.workInProgress && "Stop working") || "Start working"}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TaskEmployeeDetails;
