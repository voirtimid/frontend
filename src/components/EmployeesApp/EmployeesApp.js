import React from "react";
import {Route, Switch} from "react-router-dom";
import EmployeeService from "../../service/EmployeeService";
import EmployeesList from "./EmployeesList/EmployeesList";
import EmployeeAdd from "./EmployeeAdd/EmployeeAdd";
import EmployeeEdit from "./EmployeeEdit/EmployeeEdit";
import JobsList from "../JobsApp/JobsList/JobsList";

class EmployeesApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };

        this.createEmployee = this.createEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.loadEmployeeJobs = this.loadEmployeeJobs.bind(this);

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

    loadEmployeeJobs(employeeId) {

    }

    render() {
        return (
            <main role="main" className="mt-3">
                <div className="container">
                    <Switch>
                        <Route path={"/employees"} exact render={() => <EmployeesList employees={this.state.employees} onDelete={this.deleteEmployee} />}/>
                        <Route path={"/employees/new"} exact render={() => <EmployeeAdd onCreate={this.createEmployee}/>}/>
                        <Route path={"/employees/:employeeId/edit"} exact render={() => <EmployeeEdit onSubmit={this.updateEmployee}/>}/>
                        {/*<Route path={"/employees/:employeeId/tasks"} exact render={() => <TasksList jobs={this.loadEmployeeTasks}/>}/>*/}

                        {/*<Route path={"/pizzas/:pizzaName/details"} render={() => <PizzaDetails/>}/>*/}
                    </Switch>
                </div>
            </main>
        );
    }
}

export default EmployeesApp;