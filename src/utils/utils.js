import Cookies from 'js-cookie'


export const TOKEN_KEY = 'token'
export const USER_KEY = 'user'
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
/**
 * 获取地址栏参数
 * @param name
 * @returns {string|null}
 */
export const getQueryString=(paramer)=>{
    let urlParamArry =[]
    var url = window.location.href.split("?")[1]; /* 获取url里"?"后面的值 */
    if(!url)return;
     if (url.indexOf("&") > 0) { /* 判断是否是一个参数还是多个参数 */
             urlParamArry = url.split("&"); /* 分开每个参数，并放到数组里 */
             for (var i = 0; i < urlParamArry.length; i++) {
                    var paramerName = urlParamArry[i].split("="); /* 把每个参数名和值分开，并放到数组里 */
                     if (paramer === paramerName[0]) { /* 匹配输入的参数和数组循环出来的参数是否一样 */
                             return paramerName[1]; /* 返回想要的参数值 */
                         }
                 }
         } else { /* 判断只有个参数 */
             var paramerValue = url.split("=")[1];
             return paramerValue;
         }
}


export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: 30 })
}
export const setUser = (token) => {
    Cookies.set(USER_KEY, token, { expires: 30 })
}
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}
export const getUser = () => {
    const token = Cookies.get(USER_KEY)
    if (token) return token
    else return false
}
export const delToken = () =>{
    Cookies.remove(TOKEN_KEY)
}
export const delUser = () =>{
    Cookies.remove(USER_KEY)
}