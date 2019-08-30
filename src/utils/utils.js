export const getCommentCount=(item)=>{
    let count = 0;
     item.article_comment_set.map(el => {
        return count+=el.articlecommentreply_set.length
    })
    return count+=item.article_comment_set.length
}