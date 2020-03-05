import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import TaskService from "../../../service/TaskService";
import FileService from "../../../service/FileService";
import moment from "moment";
import FileDownload from 'js-file-download';

const TaskEmployeeDetails = (props) => {

    const history = useHistory();

    const taskId = useParams().taskId;
    const jobId = useParams().jobId;

    const [task, setTask] = useState({});
    const [employee, setEmployee] = useState({});
    const [machine, setMachine] = useState({});
    const [cnc, setCnc] = useState({});
    const [cncFileContent, setCncFileContent] = useState("");

    useEffect(() => {
        TaskService.getTask(taskId).then(response => {
            const task = response.data;
            setTask(task);
            setEmployee(task.employee);
            setMachine(task.machine);
            setCnc(task.cncCode);
            FileService.readFile(task.cncCode.cncId).then(response => {
                setCncFileContent(response.data);
            })

        })
    }, []);

    const cancelGoBack = () => {
        history.push(`/employees/${employee.employeeId}/tasks`);
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

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code file</label>
                    <div className="col-sm-6">
                        <button type="button" className="btn btn-link" onClick={() => FileService.downloadFile(cnc.cncFilename, "cnc").then(response => {
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

                <div
                    className="col-sm-3  text-center">
                    <button
                        onClick={() => cancelGoBack()}
                        type="button"
                        className="btn btn-danger text-upper">
                        Go Back
                    </button>
                </div>
            </div>

        </div>
    );
};

export default TaskEmployeeDetails;