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
