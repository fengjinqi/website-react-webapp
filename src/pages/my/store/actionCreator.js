import {MY_GETINFO,MY_ERROR,MY_ARTICLE_LIST,MY_ARTICLE_LIST_PAGE} from './actionTypes'
import {getInfo} from '../../../api/user'
import {getMyArticle,getMyArticleListPage} from '../../../api/article'

export const getMyInfo = (data)=>({
    type:MY_GETINFO,
    data
})

export const getError = (error)=>({
    type:MY_ERROR,
    error
})

export const getMyInfoAxios = (token)=>{
    return (dispatch)=>{
        getInfo(token).then(res=>{
            dispatch(getMyInfo(res.data))
        }).catch(err=>{
            dispatch(getMyInfo(err.response.data))
        })
    }
}

export const getMyArticleList =(data)=>({
    type:MY_ARTICLE_LIST,
    data
})

export const getMyArticleListAxios = (token)=>{
    return (dispatch)=>{
        getMyArticle(token).then(res=>{
            dispatch(getMyArticleList(res.data))
        })
    }
}

export const getMyArticleListPages =(data)=>({
    type:MY_ARTICLE_LIST_PAGE,
    data
})

export const getMyArticleListPageAxios = (page,token)=>{
    return (dispatch)=>{
        getMyArticleListPage(page,token).then(res=>{
            dispatch(getMyArticleListPages(res.data))
        })
    }
}
