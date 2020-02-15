import axios from '../custom-axios/axios'

class FileUploadService {

    static uploadFile(file) {
        return axios.post(`/upload`, file);
    }
}

export default FileUploadService;