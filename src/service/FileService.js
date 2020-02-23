import axios from '../custom-axios/axios'

class FileService {

    static uploadFile(file, destination) {
        return axios.post(`/upload/${destination}`, file);
    }

    static readFile(cncId) {
        return axios.get(`/upload/${cncId}`);
    }
}

export default FileService;