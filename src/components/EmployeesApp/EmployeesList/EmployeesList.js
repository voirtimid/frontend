import React, {Fragment} from "react";
import Employee from "../Employee/Employee";
import {Link} from "react-router-dom";

const EmployeesList = (props) => {

    const employees = props.employees.map(employee => <Employee userRole={props.userRole} key={employee.employeeId} employee={employee} onDelete={props.onDelete}/>);

    let employeesTable = (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="thead-light">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {employees}
                </tbody>
            </table>
        </div>
    );

    return (
        <Fragment>
            <h4 className="text-upper text-left row">Employees</h4>
            {props.userRole === "Admin" &&
            <Link className="btn btn-outline-secondary mb-3 row" to={"/employees/new"}>
                <span><strong>Add new employee</strong></span>
            </Link>
            }

            <div className="row">
                {employeesTable}
            </div>
        </Fragment>
    );

};

export default EmployeesList;
