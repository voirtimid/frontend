import React from "react";
import {Link} from "react-router-dom";

const Employee = (props) => {
    return (
        <tr>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>
                {props.userRole === "Admin" &&
                <Link className="btn btn-sm btn-secondary"
                      to={"/employees/" + props.employee.employeeId + "/edit"}>
                    <span className="fa fa-edit"/>
                    <span><strong>Edit</strong></span>
                </Link>}
                {props.userRole === "Admin" &&
                <button className="btn btn-sm btn-outline-secondary"
                        onClick={() => props.onDelete(props.employee.employeeId)}>
                    <span className="fa fa-remove"/>
                    <span><strong>Remove</strong></span>
                </button> }
                <Link className="btn btn-sm btn-outline-dark"
                      to={"/employees/" + props.employee.employeeId + "/tasks"}>
                    <span><strong>Tasks</strong></span>
                </Link>
            </td>
        </tr>
    );
};

export default Employee;