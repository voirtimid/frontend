import React, {useEffect, useState} from "react";
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from "@syncfusion/ej2-react-schedule";
import {useParams} from "react-router";
import TaskService from "../../../service/TaskService";

const MachineCalendar = (props) => {

    const machineId = useParams().machineId;

    const [data, setData] = useState([]);

    useEffect(() => {
        TaskService.getAllTasksForMachine(machineId).then(response => {


            const localData = response.data.map(task => {
                return {
                    EndTime: new Date(task.endDate),
                    StartTime: new Date(task.startDate),
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
                <ScheduleComponent height="100%" currentView='Month' eventSettings={loadData}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
            </div>
        </main>
    );
};

export default MachineCalendar;