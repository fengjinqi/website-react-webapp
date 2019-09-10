import {MY_GETINFO,MY_ERROR,MY_ARTICLE_LIST,MY_ARTICLE_LIST_PAGE} from './actionTypes'
const defaultState = {
    info:[],
    error:[],
    isShow:false,
    myArticle:[],
    myArticlePage:[]
}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case MY_GETINFO:
            return {
                ...state,
                info:action.data,
                isShow:true
            }
        case MY_ERROR:
            return {
                ...state,
                error:action.error
            }
        case MY_ARTICLE_LIST:
            return {
                ...state,
                myArticle:action.data.results,
                myArticlePage:action.data
            }
        case MY_ARTICLE_LIST_PAGE:
            return {
                ...state,
                myArticlePage:action.data,
                myArticle:state.myArticle.concat(action.data.results)
            }
        default:
            return state
    }

}