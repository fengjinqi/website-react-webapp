import React from 'react'
import {NavBar,Icon} from 'antd-mobile'
import Editor  from 'react-editor-md'
import {connect} from 'react-redux'
import {actionCreators} from './store'

class ArticleDetail extends React.Component{

    componentDidMount() {
        let id = this.props.match.params.id
        this.props.init(id)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        document.title = `文章-${nextProps.list.article.list.title}`;
        document.getElementById('desc').setAttribute('content',nextProps.list.article.list.desc)
        document.getElementById('keywords').setAttribute('content',nextProps.list.article.list.keywords)
        window.sessionStorage.setItem('k',nextProps.list.article.list.content)
    }
    getContent = ()=>{

        return this.props.list.article.list.content
    }
    render() {

        let {list} = this.props
        const ReactMarkdown = require('react-markdown')
        return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >文章</NavBar>
                <div id="test-editormd">
                    <textarea name="" id="" className="form-control" cols="30" rows="10">{this.getContent()}</textarea></div>

            </div>
        )
    }

}
const mapState=(state)=>({
    list:state
})

const mapDispatch = (dispatch)=>({
    init(id){
        dispatch(actionCreators.getArticleDetailAxios(id))
    }

})
export default connect(mapState,mapDispatch)(ArticleDetail)