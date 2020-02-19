import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";
import MachineService from "../../../service/MachineService";
import FileUploadService from "../../../service/FileUploadService";
import CncService from "../../../service/CncService";

const JobAddTask = (props) => {

    const history = useHistory();

    const jobId = useParams();

    const emptyTask = {
        taskName: "",
        jobId: jobId.jobId,
        machineId: "",
        employeeId: "",
        cncCodeId: 1,
        cncCodeFileName: "",
        startDate: "",
        endDate: "",
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
    const [cncCode, setCncCode] = useState([]);
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        EmployeeService.getAllEmployees().then(response => {
            console.log(response.data);
            setEmployees(response.data);
        })
    }, []);

    useEffect(() => {
        MachineService.getAllMachines().then(response => {
            setMachines(response.data);
        })
    }, []);



    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onCreate(jobId.jobId, task);
        history.push("/jobs");
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

    // const handleInputChangeCNC = (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     let value;
    //
    //     if (target.type === 'checkbox') {
    //         value = target.checked;
    //     } else if (target.type === 'number') {
    //         value = Number(target.value);
    //     } else {
    //         value = target.value;
    //     }
    //
    //     const cnc = {
    //         fileName: value
    //     };
    //
    //     CncService.createCnc(cnc).then(response => {
    //         setCncCode(response.data);
    //         const changedTask = {
    //             ...task,
    //             [name]: value,
    //             cncCodeId: cncCode.cncCodeId
    //         };
    //         setTask(changedTask);
    //     });
    //
    // };

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

        const changedTask = {
            ...task,
            [name]: fileName
        };

        setTask(changedTask);

    };

    const cancelGoBack = () => {
        history.push("/jobs");
    };

    let employeesDropDown = (
        <select name="employeeId" id="employeeId" onChange={handleInputChange}>
            <option disabled value="" selected>Select Employee</option>
            {employees.map(e => {
                return <option key={e.employeeId} value={e.employeeId}>{e.firstName} {e.lastName}</option>
            })}
        </select>
    );

    let machinesDropDown = (
        <select name="machineId" id="machineId" onChange={handleInputChange}>
            <option disabled value="" selected>Select Machine</option>
            {machines.map(m => {
                return <option key={m.machineId} value={m.machineId}>{m.name} - {m.shortName}</option>
            })}
        </select>
    );

    return (
        <div>
            <h4>Add Task</h4>
            <form className='card' encType='multipart/form-data' onSubmit={onFormSubmit}>

                <div className="form-group row">
                    <label htmlFor="taskName" className="col-sm-4 offset-sm-1 text-left">Task Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="taskName" name="taskName"
                               placeholder="Task Name" value={task.taskName} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Choose employee for the task</label>
                    <div className="col-sm-6">
                        {employeesDropDown}
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Choose machine for the task</label>
                    <div className="col-sm-6">
                        {machinesDropDown}
                    </div>
                </div>

                {/*<div className="form-group row">*/}
                {/*    <label htmlFor="cncCodeFileName" className="col-sm-4 offset-sm-1 text-left">CNC code</label>*/}
                {/*    <div className="col-sm-6">*/}
                {/*        <input type="text" className="form-control" id="cncCodeFileName" name="cncCodeFileName"*/}
                {/*               placeholder="CNC Code file name" value={task.cncCodeFileName} onChange={handleInputChangeCNC}/>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div className="form-group row">
                    <label htmlFor="theirTechnology" className="col-sm-4 offset-sm-1 text-left">Their Technology</label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="theirTechnology" name="theirTechnology"
                               placeholder="Their Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="myTechnology" className="col-sm-4 offset-sm-1 text-left">My Technology</label>
                    <div className="col-sm-6">
                        <input type="file" className="form-control" id="myTechnology" name="myTechnology"
                               placeholder="My Technology" onChange={onFileChangeHandler}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="startDate" name="startDate"
                               placeholder="Start Date" value={task.startDate} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                    <div className="col-sm-6">
                        <input type="date" className="form-control" id="endDate" name="endDate"
                               placeholder="End Date" value={task.endDate} onChange={handleInputChange}/>
                    </div>
                </div>

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

            </form>

        </div>
    );

};

export default JobAddTask;