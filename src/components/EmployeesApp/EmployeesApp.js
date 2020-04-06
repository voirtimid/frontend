import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";
import EmployeesList from "./EmployeesList/EmployeesList";
import EmployeeAdd from "./EmployeeAdd/EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit/EmployeeEdit";
import TasksList from "../Tasks/TasksList/TasksList";
import TaskEmployeeDetails from "../Tasks/TaskEmployeeDetails/TaskEmployeeDetails";
import autoBindReact from "auto-bind";

class EmployeesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        autoBindReact(this);
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees() {
        EmployeeService.getAllEmployees().then(response => {
            this.setState(() => ({
                employees: response.data
            }));
        })
    }

    createEmployee(employee) {
        EmployeeService.createEmployee(employee).then(response => {
            this.setState(prevState => {
                const newEmployees = [...prevState.employees, response.data];
                return {
                    "employees": newEmployees
                }
            })
        })
    }

    updateEmployee(employeeId, editedEmployee) {
        EmployeeService.updateEmployee(employeeId, editedEmployee).then(response => {
            const updatedEmployee = response.data;
            this.setState(prevState => {
                const newEmployees = prevState.employees.map(e => {
                    if (e.employeeId === updatedEmployee.employeeId) {
                        return updatedEmployee;
                    }
                    return e;
                });
                return {
                    "employees": newEmployees
                }
            })
        })
    }

    deleteEmployee(employeeId) {
        EmployeeService.deleteEmployee(employeeId).then(response => {
            const deletedEmployee = response.data;
            this.setState(prevState => {
                const newEmployees = prevState.employees.filter(e => {
                    return e.employeeId !== deletedEmployee.employeeId;
                });
                return {
                    "employees": newEmployees
                }
            })
        })
    }

    toShow() {
        if (this.props.loggedIn) {
            return (
                <Fragment>
                    <Route path={"/employees"} exact render={() => <EmployeesList userRole={this.props.userRole} employees={this.state.employees}
                                                                                  onDelete={this.deleteEmployee}/>}/>
                    <Route path={"/employees/new"} exact render={() => <EmployeeAdd onCreate={this.createEmployee}/>}/>
                    <Route path={"/employees/:employeeId/edit"} exact
                           render={() => <EmployeeEdit onSubmit={this.updateEmployee}/>}/>
                    <Route path={"/employees/:employeeId/tasks"} exact render={() => <TasksList/>}/>
                    <Route path={"/employees/:employeeId/tasks/:taskId"} exact render={() => <TaskEmployeeDetails/>}/>
                </Fragment>
            );
        }
    }


    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container-fluid w-75">
                    <Switch>
                    {this.toShow()}
                    {!this.props.loggedIn &&

                        <Route path={"/employees"} exact render={() => <EmployeesList userRole={this.props.userRole} employees={this.state.employees}
                                                                                      onDelete={this.deleteEmployee}/>}/>}
                    </Switch>
                </div>
            </main>
        );
    }
}

export default EmployeesApp;
