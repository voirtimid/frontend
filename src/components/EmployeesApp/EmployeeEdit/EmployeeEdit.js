import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import EmployeeService from "../../../service/EmployeeService";

const EmployeeEdit = (props) => {

    const history = useHistory();
    const [employee, setEmployee] = useState({});
    const {employeeId} = useParams();

    useEffect(() => {
        EmployeeService.getEmployee(employeeId).then(response => {
            setEmployee(response.data);
        });
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let modifiedEmployee = {};
        modifiedEmployee.employeeId = employeeId;
        modifiedEmployee.firstName = employee.firstName;
        modifiedEmployee.lastName = employee.lastName;
        modifiedEmployee.isAdmin = false;
        modifiedEmployee.positionDescription = employee.positionDescription;

        props.onSubmit(employeeId, modifiedEmployee);
        history.push("/employees");
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

        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const cancelGoBack = () => {
        history.push("/employees");
    };

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add Employee</h4>
                <div className="form-group row">
                    <label htmlFor="firstName" className="col-sm-4 offset-sm-1 text-left">First Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="firstName" name="firstName"
                               placeholder="First Name" value={employee.firstName} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lastName" className="col-sm-4 offset-sm-1 text-left">Last Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="lastName" name="lastName"
                               placeholder="Short Name" value={employee.lastName} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="positionDescription" className="col-sm-4 offset-sm-1 text-left">Position Description</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="positionDescription" name="positionDescription"
                               placeholder="Position Description" value={employee.positionDescription} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className="form-group row">
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
                        <button
                            type="submit"
                            // disabled={!isInputValid}
                            className="btn btn-primary text-upper">
                            Save
                        </button>
                    </div>
                    <div
                        className="offset-sm-1 col-sm-3  text-center">
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
    );

};

export default EmployeeEdit;