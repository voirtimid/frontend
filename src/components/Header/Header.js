import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";

const Header = (props) => {

    const [employee, setEmployee] = useState({});

    useEffect(() => {
        if (props.loggedIn) {
            EmployeeService.getEmployeeFromUserId(props.user.userId).then(response => {
                setEmployee(response.data);
            })
        }
    }, [props.loggedIn]);

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/">MetalCut</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        {props.user.role === "Admin" &&
                        <li className="nav-item">
                            <Link className="nav-link" to={"/jobs"}>Orders</Link>
                        </li>
                        }
                        {props.loggedIn &&
                        [
                            <li className="nav-item">
                                <Link className="nav-link" to={"/history/jobs"}>Past orders</Link>
                            </li>,
                            <li className="nav-item">
                                <Link className="nav-link" to={"/employees"}>Employees</Link>
                            </li>,
                            <li className="nav-item">
                                <Link className="nav-link" to={"/machines"}>Machines</Link>
                            </li>,
                            <li className="nav-item">
                                <Link className="nav-link" to={"/calendar"}>Calendar</Link>
                            </li>
                        ]}
                    </ul>
                </div>
                <form className="form-inline mt-2 mt-md-0 ml-3">
                    {props.loggedIn && [
                        <Link to={`/employees/${employee.employeeId}/tasks`} className={"mr-2"}
                              style={{"color": "white"}}>
                            Hello, {employee.firstName}
                        </Link>,
                        <button type="button" className="btn btn-danger"
                                onClick={() => props.logOutUser()}>Logout</button>
                    ]}
                    {!props.loggedIn &&
                    <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
                    }
                </form>
            </nav>
        </header>
    );
};

export default Header;
