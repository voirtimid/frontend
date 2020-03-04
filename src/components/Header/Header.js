import React from "react";
import {Link} from "react-router-dom";

const Header = (props) => {

    return (
        <header>
            {/*style={{backgroundColor: "#cce6ff"}}*/}
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/">MetalKat</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/jobs"}>Работни налози</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/history/jobs"}>Извештаи</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/employees"}>Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/machines"}>Machines</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;