import axios from '../utils/api.request'

/**
 * 登录
 * @param data
 * @constructor
 */
export const Login = (data)=>{
    return axios.request({
        url:'/api/login/',
        data,
        method:'post'
    })
}
/**
 * 获取用户信息
 * @param token
 */
export const getInfo = (token) =>{
    return axios.request({
        url:'/api/apiinfo/',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'get'
    })
}
export const putInfoImg = (id,token,data) =>{
    return axios.request({
        url:`/api/apiinfo/${id}/`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        data:data,
        method:'put'
    })
}