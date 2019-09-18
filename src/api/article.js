import axios from '../utils/api.request'

/**
 * 文章详情页
 * @param id
 */
export const getArticleDetail = (id)=>{
    return axios.request({
        url: `/api/article_list/${id}/`,
        /*  headers: {
              'Authorization':'JWT '+''
          },*/
        method: 'get'
    })
}
/**
 * 评论详情
 * @param id
 */
export const getArticleCommit = (id)=>{
    return axios.request({
        url:`api/article_Comment/${id}/`,
        method:'get'
    })
}
/**
 * 我的文章
 * @param token
 */
export const getMyArticle = (token)=>{
    return axios.request({
        url:'api/me_article_list/',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method:'get'
    })
}
/**
 * 我的文章分页
 * @param page
 */
export const getMyArticleListPage = (page,token)=>{
    return axios.request({
        url: 'api/me_article_list/?page='+page,
          headers: {
              'Authorization':`JWT ${token}`
          },
        method: 'get'
    })
}
/**
 * 分类
 */
export const getArticleCate = ()=>{
    return axios.request({
        url: 'api/category/',
        method: 'get'
    })
}
/**
 * 文章分类
 * @param name
 * @param page
 */
export const getArticleSaerch = (name,page)=>{
    return axios.request({
        url: `api/article_list/?category=${name}&page=${page}`,
        method: 'get'
    })
}

/**
 * 我的粉丝
 * @param token
 */
export const getMyFan = (token)=>{
    return axios.request({
        url: 'api/UserFollows/?fan=1',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}
/**
 * 我的关注
 * @param token
 */
export const getMyFollow = (token)=>{
    return axios.request({
        url: 'api/UserFollows/?follow=1',
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'get'
    })
}

/**
 * 取消关注
 * @param id
 * @param token
 */
export const delMyFan = (id,token)=>{
    return axios.request({
        url: `/api/UserFollows/${id}/?follow=1`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        method: 'delete'
    })
}
/**
 * 新增关注
 * @param data
 * @param token
 */
export const addMyFan = (data,token)=>{
    return axios.request({
        url: `/api/UserFollows/?follow=1`,
        headers: {
            'Authorization':`JWT ${token}`
        },
        data,
        method: 'post'
    })
}