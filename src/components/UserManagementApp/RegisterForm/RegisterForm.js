import React, {useState} from "react";
import {sha256} from "js-sha256";

const RegisterForm = (props) => {

    const emptyUser = {
        email: "",
        password: "",
        role: "Employee",
        firstName: "",
        lastName: ""
    };

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

        console.log(changedUser);

        setUser(changedUser);
    };

    const loginUser = (e) => {
        e.preventDefault();

        const userDTO = {
            email: user.email,
            password: sha256(user.password),
            role: user.role
        };

        console.log(userDTO);

    };

    return (
        <form onSubmit={loginUser}>
            <div className="card-body">
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 offset-sm-1 text-left">Email</label>
                    <div className="col-sm-6">
                        <input type="text"
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
                <button type="submit" className="btn btn-black">Login</button>
            </div>
        </form>
    );

};

export default RegisterForm;