import axios from 'axios'

class loginService{
    baseUrl = 'http://localhost:8081/hbms/'

    adminLogin(loginDetails){
        return axios.post(this.baseUrl+'admin/login',loginDetails)
    }

    userLogin(loginDetails){
        return axios.post(this.baseUrl+'user/login',loginDetails)
    }

}

export default loginService