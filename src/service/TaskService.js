import axios from '../custom-axios/axios'

class TaskService {
    static getAllTasks() {
        return axios.get(`/api/tasks`);
    }

    static createTask(task) {
        return axios.post(`/api/tasks`, task);
    }

    static getTask(taskId) {
        return axios.get(`/api/tasks/${taskId}`);
    }

    static updateTask(taskId, updatedTask) {
        return axios.put(`/api/tasks/${taskId}`, updatedTask);
    }

    static deleteTask(taskId) {
        return axios.delete(`/api/tasks/${taskId}`);
    }

    static addEmployeeToTask(taskId, employeeId) {
        return axios.put(`/api/tasks/${taskId}/addEmployee/${employeeId}`);
    }

    static addMachineToTask(taskId, machineId) {
        return axios.put(`/api/tasks/${taskId}/addMachine/${machineId}`);
    }

    static addCncCodeToTask(taskId, cncId) {
        return axios.put(`/api/tasks/${taskId}/addCnc/${cncId}`);
    }
}

export default TaskService;