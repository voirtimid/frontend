import axios from "../custom-axios/axios"

class UserService {

    static createNewUser(userDTO) {
        return axios.post(`/api/users`, userDTO);
    }

}

export default UserService;