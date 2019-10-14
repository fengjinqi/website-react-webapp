import axios from '../utils/api.request'

/**
 * 我的帖子
 * @param token
 */
export const getMyForum = (token)=>{
    return axios.request({
        url: 'api/forum/',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}
/**
 * 我的帖子分页
 * @param page
 * @param token
 */
export const getMyForumListPage = (page,token)=>{
    return axios.request({
        url: 'api/forum/?page='+page,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}


export const othersForum = (id)=>{
    return axios.request({
        url: `/api/forum/?pk=${id}`,
        method: 'get'
    })
}

export const othersForumPage = (id,page)=>{
    return axios.request({
        url: `/api/forum/?pk=${id}&page=${page}`,
        method: 'get'
    })
}