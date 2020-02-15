import React, {useState} from "react";
import {useHistory} from "react-router";

const EmployeeAdd = (props) => {

    const history = useHistory();

    const emptyEmployee = {
        firstName: "",
        lastName: "",
        isAdmin: false,
        positionDescription: ""
    };

    const [employee, setEmployee] = useState(emptyEmployee);

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onCreate(employee);
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

        const changedEmployee = {
            ...employee,
            [name]: value
        };

        setEmployee(changedEmployee);
    };

    const cancelGoBack = () => {
        history.push("/employees");
    };

    return (
        <div>
            <h4 className="text-upper text-left">Add Employee</h4>
            <form className="card" onSubmit={onFormSubmit}>
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

export default EmployeeAdd;