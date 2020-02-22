import React from "react";
import {Link} from "react-router-dom";

const Header = (props) => {

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/">MetalKat</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/sketches"}>Отвори работен налог</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/jobs"}>Работни налози</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/calendar"}>Calendar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/employees"}>Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/machines"}>Machines</Link>
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
                    </form>
                </div>
            </nav>
        </header>
    );
};

export default Header;