import {ARTILCE_DETAIL} from './actionTypes'
import {getArticleDetail as getArticle} from '../../../api/article'

export const getArticleDetail = (data)=>({
    type:ARTILCE_DETAIL,
    data
})

export const getArticleDetailAxios = (id)=>{
    return (dispatch)=>{
        getArticle(id).then(res=>{
            dispatch(getArticleDetail(res.data))
        })
    }
}