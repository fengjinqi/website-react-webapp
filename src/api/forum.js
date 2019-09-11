import axios from '../utils/api.request'

export const getMyForum = (token)=>{
    return axios.request({
        url: 'api/forum/',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}

export const getMyForumListPage = (page,token)=>{
    return axios.request({
        url: 'api/forum/?page='+page,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}