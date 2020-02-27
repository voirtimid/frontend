import React from "react";
import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, ViewsDirective, ViewDirective} from "@syncfusion/ej2-react-schedule";

const CalendarApp = (props) => {

    const loadData = {
        dataSource: props.data
    };

    return (
        <main role="main" className="mt-3">
            <div className="container">
                <ScheduleComponent width="100%" height="100%" currentView='Month' eventSettings={loadData}>
                    <ViewsDirective>
                        <ViewDirective option='WorkWeek' startHour='08:00' endHour='18:00'/>
                        <ViewDirective option='Week' startHour='07:00' endHour='18:00'/>
                        <ViewDirective option='Month' showWeekend={false}/>
                    </ViewsDirective>
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                </ScheduleComponent>
            </div>
        </main>
    );

};

export default CalendarApp;