import {MY_GETINFO,MY_ARTICLE_LIST,MY_ARTICLE_LIST_PAGE,MY_FORUM_LIST_PAGE,MY_FORUM_LIST,MY_FAN,MY_FOLLOW} from './actionTypes'
const defaultState = {
    info:[],
    myArticle:[],
    myArticlePage:[],
    myForum:[],
    myForumPage:[],
    myFan:[],
    myFollow:[]
}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case MY_GETINFO:
            return {
                ...state,
                info:action.data,
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
        case MY_FORUM_LIST:
            return {
                ...state,
                myForum:action.data.results,
                myForumPage:action.data
            }
        case MY_FORUM_LIST_PAGE:
            return {
                ...state,
                myForum:state.myForum.concat(action.data.results),
                myForumPage:action.data
            }
        case MY_FAN:

            return {
                ...state,
                myFan: action.data
            }
        case MY_FOLLOW:
            return {
                ...state,
                myFollow: action.data
            }
        default:
            return state
    }

}