import axios from '../custom-axios/axios'

class EmployeeService {
    static getAllEmployees() {
        return axios.get(`/api/employees`);
    }

    static createEmployee(employee) {
        return axios.post(`/api/employees`, employee);
    }

    static createEmployeeWithUser(employeeDTO) {
        return axios.post(`/api/employees/user`, employeeDTO);
    }

    static getEmployee(employeeId) {
        return axios.get(`/api/employees/${employeeId}`);
    }

    static getEmployeeFromUserId(userId) {
        return axios.get(`/api/employees/user/${userId}`);
    }

    static updateEmployee(employeeId, updatedEmployee) {
        return axios.put(`/api/employees/${employeeId}`, updatedEmployee);
    }

    static deleteEmployee(employeeId) {
        return axios.delete(`/api/employees/${employeeId}`);
    }

    static getAllTasksForEmployee(employeeId) {
        return axios.get(`/api/employees/${employeeId}/tasks`);
    }
}

export default EmployeeService;
