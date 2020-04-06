import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import FileService from "../../../service/FileService";
import CncService from "../../../service/CncService";
import TaskService from "../../../service/TaskService";
import JobService from "../../../service/JobService";

const JobAddTask = (props) => {

    const history = useHistory();
    const jobId = useParams().jobId;

    const emptyTask = {
        jobId: jobId,
        machineId: "",
        employeeId: "",
        cncCodeId: 0,
        plannedStartDate: "",
        plannedEndDate: "",
        plannedHours: 0,
        minutesForPiece: "",
        isFinished: false,
        workInProgress: false,
        comment: ""
    };

    const validation = {
        employeeError: "",
        machineError: "",
        minutesError: "",
        startDateError: "",
        endDateError: "",
    };

    const [task, setTask] = useState(emptyTask);
    const [job, setJob] = useState({});
    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);
    const [validate, setValidate] = useState(validation);
    const [firstSlotAvailable, setFirsSlotAvailable] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            setJob(response.data);
        })
    }, []);

    useEffect(() => {
        EmployeeService.getAllEmployees().then(response => {
            setEmployees(response.data);
        })
    }, []);

    useEffect(() => {
        MachineService.getAllMachines().then(response => {
            setMachines(response.data);
        })
    }, []);

    const isValid = () => {
        let employeeError = "";
        let machineError = "";
        let minutesError = "";
        let startDateError = "";
        let endDateError = "";
        if (!task.employeeId) {
            employeeError = "Employee is not chosen";
        }
        if (!task.machineId) {
            machineError = "Machine is not chosen";
        }
        if (!task.minutesForPiece) {
            minutesError = "Minutes for piece is not entered";
        }
        if (!task.plannedStartDate) {
            startDateError = "Start date is not entered";
        }
        if (!task.plannedEndDate) {
            endDateError = "End date is not entered";
        }
        if (employeeError || machineError || minutesError || startDateError || endDateError) {
            setValidate({
                ...validation,
                employeeError: employeeError,
                machineError: machineError,
                minutesError: minutesError,
                startDateError: startDateError,
                endDateError: endDateError
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

        const changedTask = {
            ...task,
            [name]: value
        };

        setTask(changedTask);

        if (changedTask.machineId) {
            TaskService.getFirstAvailableSlot(changedTask.machineId).then(response => {
                setFirsSlotAvailable(response.data);
            })
        }
    };

    const onFileChangeHandler = (e) => {
        e.preventDefault();

        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        setShowLoading(true);
        FileService.uploadFile(formData, "cnc").then(response => {
            setShowLoading(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 5000);
        }).catch(reason => {
            alert(`REASON ${reason}`);
        });

        const target = e.target;
        const value = target.value;

        let parts = value.split("\\");
        let fileName = parts[parts.length - 1];

        const cnc = {
            cncFilename: fileName
        };

        CncService.createCnc(cnc).then(response => {
            const changedTask = {
                ...task,
                cncCodeId: response.data.cncId
            };
            setTask(changedTask);
        })
    };

    const cancelGoBack = () => {
        history.push("/jobs");
    };

    let employeesDropDown = (
        <select name="employeeId" id="employeeId" onChange={handleInputChange}>
            <option disabled value="" selected hidden>Select Employee</option>
            {employees.map(e => {
                return <option key={e.employeeId} value={e.employeeId}>{e.firstName} {e.lastName}</option>
            })}
        </select>
    );

    let machinesDropDown = (
        <select name="machineId" id="machineId" onChange={handleInputChange}>
            <option disabled value="" selected hidden>Select Machine</option>
            {machines.map(m => {
                return <option key={m.machineId} value={m.machineId}>{m.name} - {m.shortName}</option>
            })}
        </select>
    );

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {

            const newTask = {
                ...task,
                // eslint-disable-next-line radix
                plannedHours: (parseInt(task.minutesForPiece) * job.numberOfPieces / 60).toFixed(1)
            };

            const taskDTO = {
                task: newTask,
                jobId: jobId,
                employeeId: task.employeeId,
                machineId: task.machineId,
                cncCodeId: task.cncCodeId,
                plannedStartDate: task.plannedStartDate,
                plannedEndDate: task.plannedEndDate,
                plannedMinutesForPiece: task.minutesForPiece
            };

            props.onCreate(jobId, taskDTO);
            history.push("/jobs");
        }
    };


    const addNewTask = (e) => {
        e.preventDefault();

        if (isValid()) {
            const newTask = {
                ...task,
                // eslint-disable-next-line radix
                plannedHours: (parseInt(task.minutesForPiece) * job.numberOfPieces / 60).toFixed(1)
            };

            const taskDTO = {
                task: newTask,
                jobId: jobId,
                employeeId: task.employeeId,
                machineId: task.machineId,
                cncCodeId: task.cncCodeId,
                plannedStartDate: task.plannedStartDate,
                plannedEndDate: task.plannedEndDate,
                plannedMinutesForPiece: task.minutesForPiece
            };

            props.onCreate(jobId, taskDTO);

            const nextTask = {
                ...emptyTask,
                cncCodeId: 0,
                machineId: task.machineId,
                employeeId: task.employeeId
            };

            setTask(nextTask);
            setValidate(validation);

            history.push(`/jobs/${jobId}/addTask`);
        }

    };

    const getWorkingHoursNeeded = () => {
        let workingHoursNeeded = 0;

        if (task.minutesForPiece.length !== 0) {
            workingHoursNeeded = parseInt(task.minutesForPiece) * job.numberOfPieces / 60;
        }

        return workingHoursNeeded.toFixed(1);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Add Task</h4>
                <form encType='multipart/form-data' onSubmit={onFormSubmit}>
                    {showAlert &&
                    <div className="alert alert-info" role="alert">
                        The file is uploaded!
                    </div>}
                    <div className="form-group row">
                        <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Choose machine for the
                            task</label>
                        <span>
                        <div style={{fontSize: 12, color: "red"}}>
                            {validate.machineError}
                        </div>
                        <div className="col-sm-6">
                            {machinesDropDown}
                        </div>
                            </span>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Choose employee for
                            the
                            task</label>
                        <span>
                            <div style={{fontSize: 12, color: "red"}}>
                            {validate.employeeError}
                        </div>
                        <div className="col-sm-6">
                            {employeesDropDown}
                        </div>
                            </span>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code file</label>
                        <div className="col-sm-6">
                            <input type="file" className="form-control" id="cncFilename" name="cncFilename"
                                   placeholder="CNC code file" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="minutesForPiece" className="col-sm-4 offset-sm-1 text-left">Minutes for
                            piece</label>
                        <div className="col-sm-6">
                            <div style={{fontSize: 12, color: "red"}}>
                                {validate.minutesError}
                            </div>
                            <input type="number" min="1" className="form-control" id="minutesForPiece"
                                   name="minutesForPiece"
                                   placeholder="Minutes for piece" value={task.minutesForPiece}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedHours" className="col-sm-4 offset-sm-1 text-left">Working hours
                            needed</label>
                        <div className="col-sm-6">
                            <input type="text" disabled className="form-control" id="plannedHours" name="plannedHours"
                                   placeholder="Working hours needed"
                                   value={getWorkingHoursNeeded() + " hours"}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedStartDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                        <div className="col-sm-6 form-inline">
                            <div style={{fontSize: 12, color: "red"}}>
                                {validate.startDateError}
                            </div>
                            <input type="date" className="form-control" id="plannedStartDate" name="plannedStartDate"
                                   min={firstSlotAvailable}
                                   placeholder="Start Date" value={task.plannedStartDate} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedEndDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                        <div className="col-sm-6 form-inline">
                            <div style={{fontSize: 12, color: "red"}}>
                                {validate.endDateError}
                            </div>
                            <input type="date" className="form-control" id="plannedEndDate" name="plannedEndDate"
                                   min={task.plannedStartDate}
                                   placeholder="End Date" value={task.plannedEndDate} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="comment" className="col-sm-4 offset-sm-1 text-left">General comment</label>
                        <div className="col-sm-6">
                        <textarea className="form-control" id="comment" name="comment"
                                  placeholder="General comment" value={task.comment} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <div
                            className="col-sm-4  text-center">
                            <button
                                type="button"
                                onClick={e => addNewTask(e)}
                                className="btn btn-primary text-upper">
                                Create next Task
                            </button>
                        </div>

                        <div
                            className="col-sm-4  text-center">
                            <button
                                type="submit"
                                disabled={showLoading}
                                className="btn btn-primary text-upper">
                                Save
                            </button>
                        </div>
                        <div>
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
                                Cancel
                            </button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );

};

export default JobAddTask;
