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

/**
 * 查看用户帖子
 * @param id
 */
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

export const  ForumList = () =>{
    return axios.request({
        url:'/api/ForumListView/',
        method:'get'
    })
}
export const  ForumListPage = (page) =>{
    return axios.request({
        url:'/api/ForumListView/?page='+page,
        method:'get'
    })
}
export const  ForumCategory = () =>{
    return axios.request({
        url:`/api/forum/category/`,
        method:'get'
    })
}

export const  ForumListSearch = (name,page) =>{
    return axios.request({
        url:`/api/ForumListView/?category=${name}&page=${page}`,
        method:'get'
    })
}

export const  ForumDetail = (id) =>{
    return axios.request({
        url:`/api/ForumListView/${id}`,
        method:'get'
    })
}
export const  ForumComment = (token,data) =>{
    return axios.request({
        url:`/api/CommentView/`,
        data,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'post'
    })
}
export const  ForumCommentRep = (data,token) =>{
    return axios.request({
        url:`/api/Parent_CommentView/`,
        data,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'post'
    })
}