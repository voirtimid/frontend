import axios from '../custom-axios/axios'

class CncService {
    static getAllCncs() {
        return axios.get(`/api/cncs`);
    }

    static createCnc(cnc) {
        return axios.post(`/api/cncs`, cnc);
    }

    static getCnc(cncId) {
        return axios.get(`/api/cncs/${cncId}`);
    }

    static updateCnc(cncId, updatedCnc) {
        return axios.put(`/api/cncs/${cncId}`, updatedCnc);
    }

    static deleteCnc(cncId) {
        return axios.delete(`/api/cncs/${cncId}`);
    }
}

export default CncService;