import Cookies from 'js-cookie'


export const TOKEN_KEY = 'token'
/**
 * 获取评论数
 * @param item
 * @returns {*}
 */
export const getCommentCount=(item)=>{
    let count = 0;
     item.article_comment_set.map(el => {
        return count+=el.articlecommentreply_set.length
    })
    return count+=item.article_comment_set.length
}
/**
 * 获取帖子评论
 * @param item
 * @returns {*}
 */
export const getForumCommentCount=(item)=>{
    let count = 0;
    item.comment_set.map(el => {
        return count+=el.parent_comment_set.length
    })
    return count+=item.comment_set.length
}

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 30 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const delToken = () =>{
    Cookies.remove(TOKEN_KEY)
}