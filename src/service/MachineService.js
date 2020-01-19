import axios from '../custom-axios/axios'

class MachineService {
    static getAllMachines() {
        return axios.get(`/api/machines`);
    }

    static createMachine(machine) {
        return axios.post(`/api/machines`, machine);
    }

    static getMachine(machineId) {
        return axios.get(`/api/machines/${machineId}`);
    }

    static updateMachine(machineId, updatedMachine) {
        return axios.put(`/api/machines/${machineId}`, updatedMachine);
    }

    static deleteMachine(machineId) {
        return axios.delete(`/api/machines/${machineId}`);
    }
}

export default MachineService;