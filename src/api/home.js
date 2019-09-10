import axios from '../utils/api.request'

/**
 * 文章列表
 * @param token
 */
export const getHomeList = (token)=>{
    return axios.request({
        url: '/api/article_list/',
      /*  headers: {
            'Authorization':'JWT '+''
        },*/
        method: 'get'
    })
}
/**
 * 文章分页
 * @param page
 */
export const getHomeListPage = (page)=>{
    return axios.request({
        url: '/api/article_list/?page='+page,
        /*  headers: {
              'Authorization':'JWT '+''
          },*/
        method: 'get'
    })
}
