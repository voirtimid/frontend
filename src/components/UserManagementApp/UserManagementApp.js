import React, {useEffect} from "react";

const UserManagementApp = (props) => {

    return (
        <div className="container w-75">
            <h4>Login/Sign up page!</h4>
            <form className="card">
                <div className="card-body">
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="firstName" name="firstName"/>
                               {/*// placeholder="First Name" value={employee.firstName} onChange={handleInputChange}/>*/}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="lastName" name="lastName"/>
                               {/*placeholder="Short Name" value={employee.lastName} onChange={handleInputChange}/>*/}
                    </div>
                </div>
                <button type="submit" className="btn btn-black">Login</button>
                <button type="submit" className="btn btn-secondary">Register</button>
                </div>
            </form>
        </div>
    );

};

export default UserManagementApp;