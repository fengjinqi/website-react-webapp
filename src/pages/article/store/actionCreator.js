import {ARTILCE_DETAIL,ARTILCE_DEL} from './actionTypes'
import {getArticleDetail as getArticle} from '../../../api/article'

export const getArticleDetail = (data)=>({
    type:ARTILCE_DETAIL,
    data
})
export const ArticleDel = ()=>({
    type:ARTILCE_DEL
})
export const getArticleDetailAxios = (id)=>{
    return (dispatch)=>{
        getArticle(id).then(res=>{
            dispatch(getArticleDetail(res.data))
        })
    }
}