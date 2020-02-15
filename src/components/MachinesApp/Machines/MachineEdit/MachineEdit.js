import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router";
import MachineService from "../../../../service/MachineService";

const MachineEdit = (props) => {

    const history = useHistory();
    const [machine, setMachine] = useState({});
    const {machineId} = useParams();

    useEffect(() => {
        MachineService.getMachine(machineId).then(response => {
            setMachine(response.data);
        });
    }, []);

    const onFormSubmit = (e) => {
        e.preventDefault();

        let modifiedMachine = {};
        modifiedMachine.machineId = machineId;
        modifiedMachine.name = machine.name;
        modifiedMachine.shortName = machine.shortName;
        modifiedMachine.description = machine.description;

        props.onSubmit(machineId, modifiedMachine);
        history.push("/machines");
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

        setMachine({
            ...machine,
            [name]: value
        });
    };


    const cancelGoBack = () => {
        history.push("/machines");
    };

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Edit Machine</h4>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-4 offset-sm-1 text-left">Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={machine.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="shortName" className="col-sm-4 offset-sm-1 text-left">Short Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="shortName" name="shortName" placeholder="Short Name" value={machine.shortName} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-4 offset-sm-1 text-left">Description</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="description" name="description" placeholder="Description" value={machine.description} onChange={handleInputChange}/>
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

export default MachineEdit;