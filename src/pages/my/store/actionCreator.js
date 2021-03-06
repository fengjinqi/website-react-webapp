import {MY_GETINFO,MY_ARTICLE_LIST,MY_ARTICLE_LIST_PAGE,MY_FORUM_LIST,MY_FORUM_LIST_PAGE,MY_FAN,
    MY_FOLLOW,MY_GETMESSAGECOUNT,OTHERARTICLE,OTHERARTICLE_PAGE,OTHERFORUM,OTHERFORUM_PAGE} from './actionTypes'
import {getInfo,getMessage} from '../../../api/user'
import {getMyArticle,getMyArticleListPage,getMyFan,getMyFollow,otherArticles,otherArticlesPage} from '../../../api/article'
import {getMyForum,getMyForumListPage,othersForum,othersForumPage} from '../../../api/forum'

export const getMyInfo = (data)=>({
    type:MY_GETINFO,
    data
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

export const getMyForumList =(data)=>({
    type:MY_FORUM_LIST,
    data
})

export const getMyForumListAxios = (token)=>{
    return (dispatch)=>{
        getMyForum(token).then(res=>{
            dispatch(getMyForumList(res.data))
        })
    }
}

export const getMyForumListPages =(data)=>({
    type:MY_FORUM_LIST_PAGE,
    data
})

export const getMyForumListPageAxios = (page,token)=>{
    return (dispatch)=>{
        getMyForumListPage(page,token).then(res=>{
            dispatch(getMyForumListPages(res.data))
        })
    }
}
export const getFan =(data)=>({
    type:MY_FAN,
    data
})
export const getFanAxios = (toekn) =>{
    return (dispatch)=>{
        getMyFan(toekn).then(res=>{
            dispatch(getFan(res.data))
        })
    }
}
/**
 * 我的关注
 * @param data
 * @returns {{data: *, type: string}}
 */
export const getFollow =(data)=>({
    type:MY_FOLLOW,
    data
})
export const getFollowAxios = (toekn) =>{
    return (dispatch)=>{
        getMyFollow(toekn).then(res=>{
            dispatch(getFollow(res.data))
        })
    }
}


export const getMessageCount = (data) =>({
    type:MY_GETMESSAGECOUNT,
    data
})

export const getMessageCountAxios = (token)=>{
    return (dispatch)=>{
        getMessage(token).then(res=>{
            dispatch(getMessageCount(res.data))
        })
    }
}

export const getOthersArticleList =(data)=>({
    type:OTHERARTICLE,
    data
})

export const getOthersArticleListAxios = (id)=>{
    return (dispatch)=>{
        otherArticles(id).then(res=>{
            dispatch(getOthersArticleList(res.data))
        })
    }
}

export const getOthersArticleListPages =(data)=>({
    type:OTHERARTICLE_PAGE,
    data
})

export const getOthersArticleListPageAxios = (id,page)=>{
    return (dispatch)=>{
        otherArticlesPage(id,page).then(res=>{
            dispatch(getOthersArticleListPages(res.data))
        })
    }
}


export const getOthersForumList =(data)=>({
    type:OTHERFORUM,
    data
})

export const getOthersForumListAxios = (id)=>{
    return (dispatch)=>{
        othersForum(id).then(res=>{
            dispatch(getOthersForumList(res.data))
        })
    }
}

export const getOthersForumListPages =(data)=>({
    type:OTHERFORUM_PAGE,
    data
})

export const getOthersForumListPagesAxios = (id,page)=>{
    return (dispatch)=>{
        othersForumPage(id,page).then(res=>{
            dispatch(getOthersForumListPages(res.data))
        })
    }
}