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