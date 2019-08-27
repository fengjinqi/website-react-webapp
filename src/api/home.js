import axios from '../utils/api.request'

export const getHomeList = (token)=>{
    return axios.request({
        url: '/api/article_list/',
      /*  headers: {
            'Authorization':'JWT '+''
        },*/
        method: 'get'
    })
}
export const getHomeListPage = (page)=>{
    return axios.request({
        url: '/api/article_list/?page='+page,
        /*  headers: {
              'Authorization':'JWT '+''
          },*/
        method: 'get'
    })
}
