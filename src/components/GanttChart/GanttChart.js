import React from "react";
// import { TimeLine } from "react-gantt-timeline";



const GanttChart = (props) => {

    let data=[ {id:1,start:new Date(), end:new Date()+1 ,name:'Demo Task 1'},
        {id:2,start:new Date(), end:new Date()+1 ,name:'Demo Task 2'}];

    let links = [ {id:1,start:1, end:2},
        {id:2,start:1, end:3}];

    return (
        <div>
            {/*<TimeLine data={data} links={links} />*/}
        </div>
    );

};

export default GanttChart;