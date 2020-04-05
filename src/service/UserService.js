import axios from "../custom-axios/axios"

class UserService {

    static createNewUser(userDTO) {
        return axios.post(`/api/users`, userDTO);
    }

    static validateUser(userDTO) {
        return axios.post(`/api/users/login`, userDTO);
    }

}

export default UserService;
