import axios from '../custom-axios/axios'

class FileUploadService {

    static uploadFile(file, destination) {
        return axios.post(`/upload/${destination}`, file);
    }
}

export default FileUploadService;