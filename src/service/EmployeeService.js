import axios from '../custom-axios/axios'

class EmployeeService {
    static getAllEmployees() {
        return axios.get(`/api/employees`);
    }

    static createEmployee(employee) {
        return axios.post(`/api/employees`, employee);
    }

    static getEmployee(employeeId) {
        return axios.get(`/api/employees/${employeeId}`);
    }

    static updateEmployee(employeeId, updatedEmployee) {
        return axios.put(`/api/employees/${employeeId}`, updatedEmployee);
    }

    static deleteEmployee(employeeId) {
        return axios.delete(`/api/employees/${employeeId}`);
    }
}

export default EmployeeService;