import React, {Fragment} from "react";
import Machine from "../Machine/Machine";
import {Link} from "react-router-dom";

const MachinesList = (props) => {

    const machines = props.machines.map(machine => <Machine key={machine.machineId} machine={machine} onDelete={props.onDelete}/>);

    let machinesTable = (
        <div className="table-responsive">
            <table className="table tr-history table-striped small">
                <thead>
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

            <div className="row">
                {machinesTable}
            </div>

            <Link className="btn btn-outline-secondary mb-3 row" to={"/machines/new"}>
                <span><strong>Add new machine</strong></span>
            </Link>
        </Fragment>
    );

};

export default MachinesList;