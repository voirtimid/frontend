import React, {useEffect, useState} from "react";
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from "@syncfusion/ej2-react-schedule";
import {useParams} from "react-router";
import TaskService from "../../../service/TaskService";
import MachineService from "../../../service/MachineService";

const MachineCalendar = (props) => {

    const machineId = useParams().machineId;

    const [data, setData] = useState([]);
    const [machine, setMachine] = useState({});

    useEffect(() => {
        MachineService.getMachine(machineId).then(response => {
            setMachine(response.data);
        })
    }, []);

    useEffect(() => {
        TaskService.getAllTasksForMachine(machineId).then(response => {
            const localData = response.data.map(task => {
                const startDateParts = task.startDate.split("-");
                const endDateParts = task.endDate.split("-");
                console.log(startDateParts);
                return {
                    StartTime: new Date(parseInt(startDateParts[0]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[2]), 8, 0),
                    EndTime: new Date(parseInt(endDateParts[0]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[2]), 20, 0),
                    Subject: task.taskName
                }
            });
            setData(localData);
        })
    }, []);

    const loadData = {
        dataSource: data
    };

    return (
        <main role="main" className="mt-3">
            <div className="container">
                <h4>Calendar for machine: {machine.name} - {machine.shortName}</h4>
                <ScheduleComponent height="800px" width="auto" currentView='Month'
                                   workHours={{highlight: true, start: '08:00', end: '20:00'}}
                                   eventSettings={loadData} readonly={true}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
            </div>
        </main>
    );
};

export default MachineCalendar;