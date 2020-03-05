import axios from '../custom-axios/axios'

class FileService {

    static uploadFile(file, destination) {
        return axios.post(`/upload/${destination}`, file);
    }

    static readFile(cncId) {
        return axios.get(`/upload/${cncId}`);
    }

    static downloadFile(fileName, destination) {
        return axios.get(`/upload/downloadFile/${destination}/${fileName}`)
    }

    static copyDirectory(from, to) {
        return axios.get(`/upload/copy/${from}/${to}`);
    }

    static renameDirectory(from, to) {
        return axios.get(`/upload/rename/${from}/${to}`);
    }
}

export default FileService;