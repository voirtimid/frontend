import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import FileService from "../../../service/FileService";
import CncService from "../../../service/CncService";
import TaskService from "../../../service/TaskService";
import JobService from "../../../service/JobService";
import moment from "moment";

const JobAddTask = (props) => {

    const history = useHistory();
    const jobId = useParams().jobId;

    const emptyTask = {
        jobId: jobId,
        machineId: "",
        employeeId: "",
        cncCodeId: 1,
        plannedStartDate: "",
        plannedEndDate: "",
        plannedHours: 0,
        minutesForPiece: "",
        isFinished: false,
        workInProgress: false
    };

    const [task, setTask] = useState(emptyTask);
    const [job, setJob] = useState({});
    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);
    const [validate, setValidate] = useState("");
    const [firstSlotAvailable, setFirsSlotAvailable] = useState("");


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

        FileService.uploadFile(formData, "cnc").then(response => {
            alert('File Upload Successfully');
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

        const newTask = {
            ...task,
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
    };


    const addNewTask = () => {
        const newTask = {
            ...task,
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
            cncCodeId: 1,
            machineId: task.machineId,
            employeeId: task.employeeId
        };

        setTask(nextTask);

        history.push(`/jobs/${jobId}/addTask`);

    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Add Task</h4>
                <form encType='multipart/form-data' onSubmit={onFormSubmit}>
                    <div className="form-group row">
                        <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Choose machine for the
                            task</label>
                        <div className="col-sm-6">
                            {machinesDropDown}
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Choose employee for
                            the
                            task</label>
                        <div className="col-sm-6">
                            {employeesDropDown}
                        </div>
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
                        <label htmlFor="minutesForPiece" className="col-sm-4 offset-sm-1 text-left">Minutes for piece</label>
                        <div className="col-sm-6">
                            <input type="number" min="1" className="form-control" id="minutesForPiece" name="minutesForPiece"
                                   placeholder="Minutes for piece" value={task.minutesForPiece} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedHours" className="col-sm-4 offset-sm-1 text-left">Working days needed</label>
                        <div className="col-sm-6">
                            <input type="text" disabled className="form-control" id="plannedHours" name="plannedHours"
                                   placeholder="Working days needed" value={Math.ceil((parseInt(task.minutesForPiece) * job.numberOfPieces / 60) / 7) + " days, or " + (parseInt(task.minutesForPiece) * job.numberOfPieces / 60).toFixed(1) + " hours"} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedStartDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                        <div className="col-sm-6 form-inline">
                            <div style={{fontSize: 12, color: "red"}}>
                                {validate}
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
                                {validate}
                            </div>
                            <input type="date" className="form-control" id="plannedEndDate" name="plannedEndDate"
                                   min={task.plannedStartDate}
                                   placeholder="End Date" value={task.plannedEndDate} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <div
                            className="col-sm-4  text-center">
                            <button
                                type="button"
                                onClick={() => addNewTask()}
                                // disabled={!isInputValid}
                                className="btn btn-primary text-upper">
                                Create next Task
                            </button>
                        </div>

                        <div
                            className="col-sm-4  text-center">
                            <button
                                type="submit"
                                // disabled={!isInputValid}
                                className="btn btn-primary text-upper">
                                Save
                            </button>
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