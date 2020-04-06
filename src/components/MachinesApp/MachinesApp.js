import React from "react";
import {Route, Switch} from "react-router-dom";
import MachinesList from "./MachinesList/MachinesList";
import MachineService from "../../service/MachineService";
import MachineAdd from "./MachineAdd/MachineAdd";
import MachineEdit from "./MachineEdit/MachineEdit";
import MachineCalendar from "../CalendarApp/MachineCalendar/MachineCalendar";
import autoBindReact from "auto-bind";

class MachinesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            machines: [],
            tasks: []
        };
        autoBindReact(this);
    }

    componentDidMount() {
        this.loadMachines();
    }

    loadMachines()
    {
        MachineService.getAllMachines().then(response => {
            this.setState(() => ({
                machines: response.data
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

    toShow() {
        if (this.props.loggedIn) {
            return (
                <Switch>
                    <Route path={"/machines"} exact
                           render={() => <MachinesList userRole={this.props.userRole} machines={this.state.machines} onDelete={this.deleteMachine} />}/>
                    <Route path={"/machines/new"} exact
                           render={() => <MachineAdd onCreate={this.createMachine}/>}/>
                    <Route path={"/machines/:machineId/edit"}
                           render={() => <MachineEdit onSubmit={this.updateMachine}/>}/>
                    <Route path={"/machines/:machineId/calendar"}
                           render={() => <MachineCalendar />}/>
                </Switch>
            );
        }
    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container-fluid w-75">
                    {this.toShow()}
                    <Switch>
                        <Route path={"/machines"} exact
                               render={() => <MachinesList userRole={this.props.userRole} machines={this.state.machines} onDelete={this.deleteMachine} />}/>
                    </Switch>
                </div>
            </main>
        );
    }
}

export default MachinesApp;
