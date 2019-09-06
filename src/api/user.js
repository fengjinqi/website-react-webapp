import axios from '../utils/api.request'

export const Login = (data)=>{
    return axios.request({
        url:'/api/login/',
        data,
        method:'post'
    })
}