import React, {useState} from "react";
import {useHistory} from "react-router";

const EmployeeAdd = (props) => {

    const history = useHistory();

    const employeeValidation = {
        firstNameError: "",
        lastNameError: ""
    };

    const emptyEmployee = {
        firstName: "",
        lastName: ""
    };

    const [employee, setEmployee] = useState(emptyEmployee);

    const [employeeValidated, setEmployeeValidated] = useState(employeeValidation);

    const validate = () => {
        let firstNameError = "";
        let lastNameError = "";
        if (!employee.firstName) {
            firstNameError = "First name is not entered";
        }
        if (!employee.lastName) {
            lastNameError = "Last name is not entered";
        }
        if (firstNameError || lastNameError) {
            setEmployeeValidated({
                ...employeeValidation,
                firstNameError: firstNameError,
                lastNameError: lastNameError
            });
            return false;
        }
        return true;

    };

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

        const changedEmployee = {
            ...employee,
            [name]: value
        };

        setEmployee(changedEmployee);
    };

    const cancelGoBack = () => {
        history.push("/employees");
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();

        if (isValid) {
            props.onCreate(employee);
            history.push("/employees");
        }
    };


    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={onFormSubmit}>
                    <h4 className="text-upper text-left card-title">Add Employee</h4>
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                        <div className="col-sm-6">
                            <div style={{fontSize: 12, color: "red"}}>
                                {employeeValidated.firstNameError}
                            </div>
                            <input type="text" className="form-control" id="firstName" name="firstName"
                                   placeholder="First Name" value={employee.firstName} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                        <div className="col-sm-6">
                            <div style={{fontSize: 12, color: "red"}}>
                                {employeeValidated.lastNameError}
                            </div>
                            <input type="text" className="form-control" id="lastName" name="lastName"
                                   placeholder="Short Name" value={employee.lastName} onChange={handleInputChange}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div
                            className="col-sm-4  text-center">
                            <button
                                type="submit"
                                // disabled={!isInputValid}
                                className="btn btn-primary text-upper"><span className="fa fa-save"/>
                                Save
                            </button>
                        </div>
                        <div
                            className="col-sm-8  text-center">
                            <button
                                onClick={() => cancelGoBack()}
                                type="button"
                                className="btn btn-danger text-upper">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeAdd;