import axios from "../custom-axios/axios"

class RoleService {

    static getAllRoles() {
        return axios.get(`/api/roles`);
    }
}

export default RoleService;