import React, {useState} from "react";
import {sha256} from "js-sha256";
import {useHistory} from "react-router";

const LoginForm = (props) => {

    const emptyUser = {
        email: "",
        password: "",
        role: "Employee",
        firstName: "",
        lastName: ""
    };

    const history = useHistory();

    const [user, setUser] = useState(emptyUser);

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        let value;

        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'number') {
            value = Number(target.value);
        } else {
            value = target.value;
        }

        const changedUser = {
            ...user,
            [name]: value
        };

        setUser(changedUser);
    };

    const loginUser = (e) => {
        e.preventDefault();

        if (props.shouldRegister) {
            const userDTO = {
                email: user.email,
                password: sha256(user.password),
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            };

            props.onRegister(userDTO);
        } else {

            const userDTO = {
                email: user.email,
                password: sha256(user.password),
                role: user.role
            };
            props.onLogin(userDTO);
        }
    };

    return (
        <form onSubmit={loginUser}>
            <div className="card-body">
                {props.shouldRegister &&
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        {/*<div style={{fontSize: 12, color: "red"}}>*/}
                        {/*    {employeeValidated.firstNameError}*/}
                        {/*</div>*/}
                        <input type="text" className="form-control" id="firstName" name="firstName"
                               placeholder="First Name" value={user.firstName} onChange={handleInputChange}/>
                    </div>
                </div>}
                {props.shouldRegister &&
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        {/*<div style={{fontSize: 12, color: "red"}}>*/}
                        {/*    {employeeValidated.lastNameError}*/}
                        {/*</div>*/}
                        <input type="text" className="form-control" id="lastName" name="lastName"
                               placeholder="Short Name" value={user.lastName} onChange={handleInputChange}/>
                    </div>
                </div>
                }
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 offset-sm-1 text-left">Email</label>
                    <div className="col-sm-6">
                        <input type="email"
                               className="form-control"
                               id="email" name="email"
                               placeholder="Email"
                               value={user.email} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 offset-sm-1 text-left">Password</label>
                    <div className="col-sm-6">
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                               placeholder="Password"
                               value={user.password} onChange={handleInputChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">{(props.shouldRegister && "Register") || "Login"}</button>
            </div>
        </form>
    );
};

export default LoginForm;
