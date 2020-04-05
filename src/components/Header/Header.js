import React from "react";
import {Link} from "react-router-dom";

const Header = (props) => {

    const user = props.user;

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/">MetalCut</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/jobs"}>Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/history/jobs"}>Past orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/employees"}>Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/machines"}>Machines</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/calendar"}>Calendar</Link>
                        </li>
                    </ul>
                </div>
                <form className="form-inline mt-2 mt-md-0 ml-3">
                    Hello, {user.email}
                    <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
                </form>
            </nav>
        </header>
    );
};

export default Header;
