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
/**
 * 修改资料
 * @param id
 * @param token
 * @param data
 */
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

/**
 * 个人中心获取消息列表
 * @param token
 */
export const getMessage = (token)=>{
    return axios.request({
        url:`/api/UserMessages/?type=unread`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'get'
    })
}
/**
 * 消息列表
 * @param token
 */
export const appGetMessage = (token)=>{
    return axios.request({
        url:`/api/AppMessage/`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'get'
    })
}
/**
 * 已读
 * @param token
 * @param data
 * @param id
 */
export const appPutMessage = (token,data,id)=>{
    return axios.request({
        url:`/api/AppMessage/${id}/`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        data:data,
        method:'put'
    })
}

export const getOhtersInfo = (id)=>{
    return axios.request({
        url:`/api/all_info/${id}`,
        method:'get'
    })
}

