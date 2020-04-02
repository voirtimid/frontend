import React, {useEffect, useState} from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule";
import TaskService from "../../service/TaskService";

const CalendarApp = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        TaskService.getAllInProgressTasks().then(response => {
            const localData = response.data.map(task => {
                const startDateParts = task.plannedStartDate.split("-");
                const endDateParts = task.plannedEndDate.split("-");
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
            <div className="container-fluid w-75">
                <ScheduleComponent height="800px" width="auto" currentView='Month'
                                   workHours={{highlight: true, start: '08:00', end: '20:00'}}
                                   eventSettings={loadData} readonly={true}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
            </div>
        </main>
    );

};

export default CalendarApp;
