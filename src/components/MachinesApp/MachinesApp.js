import React from "react";
import {Route, Switch} from "react-router-dom";
import MachinesList from "./MachinesList/MachinesList";
import MachineService from "../../service/MachineService";
import MachineAdd from "./MachineAdd/MachineAdd";
import MachineEdit from "./MachineEdit/MachineEdit";
import MachineCalendar from "../CalendarApp/MachineCalendar/MachineCalendar";

class MachinesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            machines: [],
            tasks: []
        };
        this.createMachine = this.createMachine.bind(this);
        this.updateMachine = this.updateMachine.bind(this);
        this.deleteMachine = this.deleteMachine.bind(this);
    }

    componentDidMount() {
        this.loadMachines();
    }

    loadMachines()
    {
        MachineService.getAllMachines().then(response => {
            const machines = response.data.filter(machine => { return machine.deleted === false});
            this.setState(() => ({
                machines: machines
            }))
        })
    }

    createMachine(machine) {
        MachineService.createMachine(machine).then(response => {
            this.setState(prevState => {
                const newMachines = [...prevState.machines, response.data];
                return {
                    "machines": newMachines
                }
            })
        })
    }

    updateMachine(machineId, editedMachine) {
        MachineService.updateMachine(machineId, editedMachine).then(response => {
            const updatedMachine = response.data;
            this.setState(prevState => {
                const newMachines = prevState.machines.map(m => {
                    if (m.machineId === updatedMachine.machineId) {
                        return updatedMachine;
                    }
                    return m;
                });
                return {
                    "machines": newMachines
                }
            })
        })
    }

    deleteMachine(machineId) {
        MachineService.deleteMachine(machineId).then(response => {
            const deletedMachine = response.data;
            this.setState(prevState => {
                const newMachines = prevState.machines.filter(m => {
                    return m.machineId !== deletedMachine.machineId;
                });
                return {
                    "machines": newMachines
                }
            })
        })
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container-fluid w-75">
                    <Switch>
                        <Route path={"/machines"} exact
                               render={() => <MachinesList machines={this.state.machines} onDelete={this.deleteMachine} />}/>
                        <Route path={"/machines/new"} exact
                               render={() => <MachineAdd onCreate={this.createMachine}/>}/>
                        <Route path={"/machines/:machineId/edit"}
                               render={() => <MachineEdit onSubmit={this.updateMachine}/>}/>
                        <Route path={"/machines/:machineId/calendar"}
                               render={() => <MachineCalendar />}/>
                    </Switch>
                </div>
            </main>
        );
    }
}

export default MachinesApp;