
import axios from "axios";

class UserService
{
    addUser(user) {
        //console.log("inside service"+JSON.stringify(user))
        return axios.post('http://localhost:8081/hbms/user', user);
    }


    updateUser(user) {
        return axios.put('http://localhost:8081/hbms/user', user);
    
    }

    findUserById(userId)
    {
        return axios.get('http://localhost:8081/hbms/admin/user/'+userId)
    }

    showAllUser()
    {
        return axios.get('http://localhost:8081/hbms/admin/user')
       
    }

    deleteUserById(userId)
    {
        return axios.delete('http://localhost:8081/hbms/user/'+userId)
    }

    getUserByEmail(email)
    {
        return axios.get('http://localhost:8081/hbms/user/getbyemail/'+email)
    }
}

export default UserService