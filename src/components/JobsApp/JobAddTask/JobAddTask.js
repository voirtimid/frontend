import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import FileService from "../../../service/FileService";
import CncService from "../../../service/CncService";
import TaskService from "../../../service/TaskService";
import Task from "../../Tasks/Task/Task";
import moment from "moment";

const JobAddTask = (props) => {

    const history = useHistory();
    const jobId = useParams().jobId;

    const emptyTask = {
        taskName: "",
        jobId: jobId,
        machineId: "",
        employeeId: "",
        cncCodeId: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        totalWorkTime: 0,
        measuringList: "",
        usedTools: "",
        pieceByMinute: "",
        priceByPiece: "",
        totalGain: "",
        isFinished: false,
        workInProgress: false
    };

    const [task, setTask] = useState(emptyTask);
    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);
    const [validate, setValidate] = useState("");

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
        const startDateTime = moment(`${task.startDate} ${task.startTime}`, 'YYYY-MM-DD HH:mm:ss').format().split("+")[0];
        const endDateTime = moment(`${task.endDate} ${task.endTime}`, 'YYYY-MM-DD HH:mm:ss').format().split("+")[0];
        const dateTimeDTO = {
            startDateTime: startDateTime,
            endDateTime: endDateTime
        };

        TaskService.checkIfSlotIsAvailable(dateTimeDTO).then(response => {
            console.log(response.data);
            if (!response.data) {
                setValidate("Time slot is not available");
                return false;
            }
            return true;
        })
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

        const taskDTO = {
            task: task,
            jobId: jobId,
            employeeId: task.employeeId,
            machineId: task.machineId,
            cncCodeId: task.cncCodeId,
            startDate: task.startDate,
            startTime: task.startTime,
            endDate: task.endDate,
            endTime: task.endTime,
        };


        // if (isValid()) {
            props.onCreate(jobId, taskDTO);
            history.push("/jobs");
        // }
    };

    return (
        <div>
            <h4>Add Task</h4>
            <form className='card' encType='multipart/form-data' onSubmit={onFormSubmit}>
                <div className="card-body">
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-sm-4 offset-sm-1 text-left">Task Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="taskName" name="taskName"
                               placeholder="Task Name" value={task.taskName} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Choose employee for the task</label>
                    <div className="col-sm-6">
                        {employeesDropDown}
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Choose machine for the task</label>
                    <div className="col-sm-6">
                        {machinesDropDown}
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code file</label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="cncFilename" name="cncFilename"
                               placeholder="CNC code file" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                    <div className="col-sm-6 form-inline">
                        <div style={{ fontSize: 12, color: "red"}}>
                            {validate}
                        </div>
                        <input type="date" className="form-control" id="startDate" name="startDate"
                               placeholder="Start Date" value={task.startDate} onChange={handleInputChange}/>
                        <input type="time" className="form-control" id="startTime" name="startTime" min="08:00:00" max="18:00:00"
                               placeholder="Start Time" value={task.startTime} onChange={handleInputChange}/>
                    </div>
                </div>

                <br />
                <hr />

                <div className="form-group row">
                    <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                    <div className="col-sm-6 form-inline">
                        <div style={{ fontSize: 12, color: "red"}}>
                            {validate}
                        </div>
                        <input type="date" className="form-control" id="endDate" name="endDate"
                               placeholder="End Date" value={task.endDate} onChange={handleInputChange}/>
                        <input type="time" className="form-control" id="endTime" name="endTime" min="08:00:00" max="18:00:00"
                               placeholder="End Date" value={task.endTime} onChange={handleInputChange}/>
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
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            onClick={() => cancelGoBack()}
                            type="button"
                            className="btn btn-danger text-upper">
                            Cancel
                        </button>
                    </div>
                </div>
                </div>

            </form>

        </div>
    );

};

export default JobAddTask;