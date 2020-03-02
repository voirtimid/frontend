import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import TaskService from "../../../service/TaskService";
import MachineService from "../../../service/MachineService";
import EmployeeService from "../../../service/EmployeeService";
import FileService from "../../../service/FileService";
import CncService from "../../../service/CncService";
import moment from "moment";
import JobService from "../../../service/JobService";

const TaskEdit = (props) => {

    const history = useHistory();

    const taskId = useParams().taskId;
    const jobId = useParams().jobId;

    const [task, setTask] = useState({});
    const [job, setJob] = useState({});
    const [employee, setEmployee] = useState({});
    const [machine, setMachine] = useState({});
    const [cnc, setCnc] = useState({});
    const [employees, setEmployees] = useState([]);
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        TaskService.getTask(taskId).then(response => {
            const task = response.data;
            setTask(task);
            setEmployee(task.employee);
            setMachine(task.machine);
            setCnc(task.cncCode);
        })
    }, []);

    useEffect(() => {
        JobService.getJob(jobId).then(response => {
            setJob(response.data);
        })
    }, []);

    useEffect(() => {
        MachineService.getAllMachines().then(response => {
            setMachines(response.data);
        })
    }, []);

    useEffect(() => {
        EmployeeService.getAllEmployees().then(response => {
            setEmployees(response.data);
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

    let employeesDropDown = (
        <select name="employeeId" id="employeeId" onChange={handleInputChange}>
            <option value={employee.employeeId}
                    selected={employee.employeeId}>{employee.firstName} {employee.lastName}</option>
            {employees.map(e => {
                return <option key={e.employeeId} value={e.employeeId}>{e.firstName} {e.lastName}</option>
            })}
        </select>
    );

    let machinesDropDown = (
        <select name="machineId" id="machineId" onChange={handleInputChange}>
            <option value={machine.machineId} selected={machine.machineId}>{machine.name} - {machine.shortName}</option>
            {machines.map(m => {
                return <option key={m.machineId} value={m.machineId}>{m.name} - {m.shortName}</option>
            })}
        </select>
    );

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            ...task,
            realMinutesForPiece: (task.totalWorkTime / job.numberOfPieces) * 60
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

        TaskService.updateTask_v2(taskDTO).then(response => {
            JobService.updateRealDates(jobId).then(response => {
                const updatedJob = response.data;
                history.push(`/jobs/${updatedJob.jobId}/tasks`);
            });
        })
    };

    const cancelGoBack = () => {
        history.push(`/jobs/${job.jobId}/tasks`);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Edit: {task.taskName}</h4>
                <form encType='multipart/form-data' onSubmit={onFormSubmit}>
                    <hr/>
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
                            {cnc.cncFilename}
                            <input type="file" className="form-control" id="cncFilename" name="cncFilename"
                                   placeholder="CNC code file" onChange={onFileChangeHandler}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedHours" className="col-sm-4 offset-sm-1 text-left">Planned Working
                            hours</label>
                        <div className="col-sm-3">
                            <input type="text" disabled className="form-control" id="plannedHours" name="plannedHours"
                                   placeholder="Actual Working hours" value={task.plannedHours}
                                   onChange={handleInputChange}/>
                        </div>
                        <br/>
                        <label htmlFor="totalWorkTime" className="col-sm-4 offset-sm-1 text-left">Actual Working
                            hours</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="totalWorkTime" name="totalWorkTime"
                                   placeholder="Actual Working hours" value={task.totalWorkTime}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="minutesForPiece" className="col-sm-4 offset-sm-1 text-left">Minutes for
                            piece</label>
                        <div className="col-sm-3">
                            <input type="text" disabled className="form-control" id="minutesForPiece"
                                   name="minutesForPiece"
                                   placeholder="Real Minutes for piece" value={task.minutesForPiece}
                                   onChange={handleInputChange}/>
                        </div>
                        <br/>
                        <label htmlFor="realMinutesForPiece" className="col-sm-4 offset-sm-1 text-left">Real Minutes for
                            piece</label>
                        <div className="col-sm-3">
                            <input type="number" disabled className="form-control" id="realMinutesForPiece"
                                   name="realMinutesForPiece"
                                   placeholder="Real Minutes for piece"
                                   value={(task.totalWorkTime / job.numberOfPieces) * 60} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedStartDate" className="col-sm-4 offset-sm-1 text-left">Planned Start
                            Date</label>
                        <div className="col-sm-3">
                            {moment(task.plannedStartDate).format("DD-MMM-YYYY")}
                        </div>
                        <br/>
                        <label htmlFor="realStartDate" className="col-sm-4 offset-sm-1 text-left">Actual Start
                            Date</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control" id="realStartDate" name="realStartDate"
                                   placeholder="Actual Start Date" value={task.realStartDate}
                                   onChange={handleInputChange}/>
                        </div>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label htmlFor="plannedEndDate" className="col-sm-4 offset-sm-1 text-left">Planned End
                            Date</label>
                        <div className="col-sm-3">
                            {moment(task.plannedEndDate).format("DD-MMM-YYYY")}
                        </div>
                        <br/>
                        <label htmlFor="realEndDate" className="col-sm-4 offset-sm-1 text-left">Actual End Date</label>
                        <div className="col-sm-3">
                            <input type="date" className="form-control" id="realEndDate" name="realEndDate"
                                   placeholder="Actual End Date" value={task.realEndDate} onChange={handleInputChange}/>
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

export default TaskEdit;