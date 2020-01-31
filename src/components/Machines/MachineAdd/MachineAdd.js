import React, {useState} from "react";
import {useHistory, useParams} from "react-router";

const MachineAdd = (props) => {

    const history = useHistory();

    const emptyMachine = {
        name: "",
        shortName: "",
        description: ""
    };

    const [machine, setMachine] = useState(emptyMachine);

    const onFormSubmit = (e) => {
        e.preventDefault();

        props.onCreate(machine);
        history.push("/machines")
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

    return (
        <div className="row">
            <form className="card" onSubmit={onFormSubmit}>
                <h4 className="text-upper text-left">Add Machine</h4>
                <div className="form-group row">
                    <label htmlFor="ingredient" className="col-sm-4 offset-sm-1 text-left">Machine name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="machine" name="name"
                               placeholder="Machine name" value={machine.name} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Short name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" id="shortName" name="shortName"
                               placeholder="Short Name" value={machine.shortName} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="amount" className="col-sm-4 offset-sm-1 text-left">Description</label>
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
                    {/*<div*/}
                    {/*    className="offset-sm-1 col-sm-3  text-center">*/}
                    {/*    <button*/}
                    {/*        onClick={() => cancelGoBack()}*/}
                    {/*        type="button"*/}
                    {/*        className="btn btn-danger text-upper">*/}
                    {/*        Cancel*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </form>
        </div>
    );

};

export default MachineAdd;