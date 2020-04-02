import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import TaskService from "../../service/TaskService";



const GanttChart = (props) => {


    const [data, setData] = useState([]);

    useEffect(() => {
        TaskService.getAllInProgressTasks().then(response => {
            const localData = response.data.map(task => {
                const startDateParts = task.plannedStartDate.split("-");
                const endDateParts = task.plannedEndDate.split("-");
                const percentDone = task.trackedWorkTime / task.plannedHours;
                return [
                    task.taskId.toString(),
                    task.taskName.toString(),
                    new Date(parseInt(startDateParts[0]), parseInt(startDateParts[1]) - 1, parseInt(startDateParts[2])),
                    new Date(parseInt(endDateParts[0]), parseInt(endDateParts[1]) - 1, parseInt(endDateParts[2])),
                    null,
                    percentDone,
                    null
                ]
            });
            localData.unshift([
                { type: 'string', label: 'Task ID' },
                { type: 'string', label: 'Task Name' },
                { type: 'date', label: 'Start Date' },
                { type: 'date', label: 'End Date' },
                { type: 'number', label: 'Duration' },
                { type: 'number', label: 'Percent Complete' },
                { type: 'string', label: 'Dependencies' }
            ]);
            setData(localData);
        })
    }, []);



    return (
        <div>
            <Chart chartType="Gantt"
                   data={data}>
            </Chart>
        </div>
    );

};

export default GanttChart;
