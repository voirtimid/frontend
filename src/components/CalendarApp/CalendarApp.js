import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule";

const CalendarApp = (props) => {

    const loadData = {
        dataSource: props.data
    };

    return (
        <main role="main" className="mt-3">
            <div className="container">
                <ScheduleComponent currentView='Month' eventSettings={loadData}>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
            </div>
        </main>
    );

};

export default CalendarApp;