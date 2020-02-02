import React from "react";
import {Link} from "react-router-dom";

const Machine = (props) => {
    return (
        <tr>
            <td>{props.machine.name}</td>
            <td>{props.machine.shortName}</td>
            <td>{props.machine.description}</td>
            <td>
                <Link className="btn btn-sm btn-secondary"
                      to={"/machines/" + props.machine.machineId + "/edit"}>
                    <span className="fa fa-edit"/>
                    <span><strong>Edit</strong></span>
                </Link>
                <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => props.onDelete(props.machine.machineId)}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button>
                <Link className="btn btn-sm btn-outline-dark"
                      to={"/machines/" + props.machine.machineId + "/details"}>
                    <span><strong>Details</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default Machine;