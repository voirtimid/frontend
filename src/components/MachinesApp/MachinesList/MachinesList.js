import React, {Fragment} from "react";
import Machine from "../Machine/Machine";
import {Link} from "react-router-dom";

const MachinesList = (props) => {

    const machines = props.machines.map(machine => <Machine userRole={props.userRole} key={machine.machineId} machine={machine} onDelete={props.onDelete}/>);

    let machinesTable = (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Short name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {machines}
                </tbody>
            </table>
        </div>
    );


    return (
        <Fragment>
            <h4 className="text-upper text-left row">Machines</h4>
            {props.userRole === "Admin" &&
            <Link className="btn btn-outline-secondary mb-3 row" to={"/machines/new"}>
                <span><strong>Add new machine</strong></span>
            </Link> }

            <div className="row">
                {machinesTable}
            </div>
        </Fragment>
    );

};

export default MachinesList;