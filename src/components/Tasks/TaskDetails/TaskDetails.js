import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import TaskService from "../../../service/TaskService";
import FileService from "../../../service/FileService";
import moment from "moment";

const TaskDetails = (props) => {

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
        history.push(`/jobs/${jobId}/tasks`);
    };

    return (
        <div>
            <h4>Task</h4>
            <div className="card">
                <div className="form-group row">
                    <label htmlFor="taskName" className="col-sm-4 offset-sm-1 text-left">Task Name</label>
                    <div className="col-sm-6">
                        {task.taskName}
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="employeeId" className="col-sm-4 offset-sm-1 text-left">Employee for the task</label>
                    <div className="col-sm-6">
                        {employee.firstName} {employee.lastName}
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="machineId" className="col-sm-4 offset-sm-1 text-left">Machine for the task</label>
                    <div className="col-sm-6">
                        {machine.name} - {machine.shortName}
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code file</label>
                    <div className="col-sm-6">
                        {cnc.cncFilename}
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="cncFilename" className="col-sm-4 offset-sm-1 text-left">CNC code content</label>
                    <div className="col-sm-6">
                        <textarea rows="10" cols="50" value={cncFileContent}/>
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="startDate" className="col-sm-4 offset-sm-1 text-left">Start Date</label>
                    <div className="col-sm-6">
                        { moment(task.startDate).format("DD-MMM-YYYY")}
                    </div>
                </div>

                <hr />

                <div className="form-group row">
                    <label htmlFor="endDate" className="col-sm-4 offset-sm-1 text-left">End Date</label>
                    <div className="col-sm-6">
                        { moment(task.endDate).format("DD-MMM-YYYY")}
                    </div>
                </div>

                <hr />

                <div
                    className="offset-sm-1 col-sm-3  text-center">
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

export default TaskDetails;