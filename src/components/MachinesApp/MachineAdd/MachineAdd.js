import React, {useState} from "react";
import {useHistory} from "react-router";

const MachineAdd = (props) => {

    const history = useHistory();

    const emptyMachine = {
        name: "",
        shortName: "",
        description: ""
    };

    const validation = {
        nameError: "",
        shortNameError: ""
    };

    const [machine, setMachine] = useState(emptyMachine);
    const [validate, setValidate] = useState(validation);

    const isValid = () => {
        let nameError = "";
        let shortNameError = "";

        if (!machine.name) {
            nameError = "Enter machine name";
        }
        if (!machine.shortName) {
            shortNameError = "Enter machine short name";
        }

        if (nameError || shortNameError) {
            setValidate({
                ...validation,
                nameError: nameError,
                shortNameError: shortNameError
            });
            return false;
        }

        return true
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

        const changedMachine = {
            ...machine,
            [name]: value
        };

        setMachine(changedMachine);
    };

    const cancelGoBack = () => {
        history.push("/machines");
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            props.onCreate(machine);
            history.push("/machines");
        }
    };

    return (
        <div>
            <h4 className="text-upper text-left">Add Machine</h4>
            <form className="card" onSubmit={onFormSubmit}>
                <div className="card-body">
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">Machine name</label>
                    <div className="col-sm-6">
                        <div style={{ fontSize: 12, color: "red"}}>
                            {validate.nameError}
                        </div>
                        <input type="text" className="form-control" id="name" name="name"
                               placeholder="Machine name" value={machine.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="shortName" className="col-sm-4 offset-sm-1 text-left">Short name</label>
                    <div className="col-sm-6">
                        <div style={{ fontSize: 12, color: "red"}}>
                            {validate.shortNameError}
                        </div>
                        <input type="text" className="form-control" id="shortName" name="shortName"
                               placeholder="Short Name" value={machine.shortName} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-4 offset-sm-1 text-left">Description</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="description" name="description"
                               placeholder="Description" value={machine.description} onChange={handleInputChange}/>
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
                </div>
            </form>
        </div>
    );

};

export default MachineAdd;