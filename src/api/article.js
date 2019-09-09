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