import axios from '../custom-axios/axios'

class TaskService {
    static getAllTasks() {
        return axios.get(`/api/tasks`);
    }

    static createTask(task, jobId, employeeId, machineId, cncCodeId) {
        const taskDTO = {
            task: task,
            jobId: jobId,
            employeeId: employeeId,
            machineId: machineId,
            cncCodeId: cncCodeId
        };
        return axios.post(`/api/tasks`, taskDTO);
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

    static startWorkingOnTask(taskId) {
        return axios.put(`/api/tasks/${taskId}/startWorkTime`)
    }

    static endWorkingOnTask(taskId) {
        return axios.put(`/api/tasks/${taskId}/endWorkTime`);
    }

    static completeTask(taskId) {
        return axios.put(`/api/tasks/${taskId}/complete`);
    }
}

export default TaskService;