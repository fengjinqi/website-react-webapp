import React from 'react'
import {NavBar, Icon, WingBlank, ActivityIndicator} from 'antd-mobile'
import {getCommentCount} from '../../utils/utils'
import MarkdownEditor from '@uiw/react-markdown-editor';
import {connect} from 'react-redux'
import {actionCreators} from './store'
import MDEditor from '@uiw/react-md-editor';
import Editor from 'react-editor-md';
import ShareButtons from '../../components/Share'
import jquery from 'jquery'
import './style.less'
import '../../static/css/share.min.css'
class ArticleDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isShow:true
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.props.init(id)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        document.title = `文章-${nextProps.list.article.list.title}`;
        document.getElementById('desc').setAttribute('content',nextProps.list.article.list.desc)
        document.getElementById('keywords').setAttribute('content',nextProps.list.article.list.keywords)
        window.sessionStorage.setItem('k',nextProps.list.article.list.content)
        this.setState({
            isShow:false
        })

    }

    getContent = ()=>{

        return this.props.list.article.list.content
    }
    componentWillUnmount() {
        this.props.Unmount()
    }

    render() {

        let {list} = this.props.list.article

        return(
            <div>
                <WingBlank>
                    <ActivityIndicator toast text="正在加载" animating={this.state.isShow} />
                </WingBlank>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >文章</NavBar>
                {!this.state.isShow?
                    <div className="main">
                        <div className='detail-header'>
                            <div className='detaile-header-img'>
                                {console.log(list.authors)}

                                <img src={list.authors.user_imag?list.authors.user_imag:list.authors.user_image} alt=""/>
                                <span>{list.authors.username}</span>
                                <span>{list.click_nums}</span>
                                <span>{getCommentCount(list)}</span>
                            </div>
                            <h1>{list.title}</h1>

                        </div>
                        <Editor.EditorShow config={
                            {
                                markdown: // testEditor.getMarkdown().replace(/`/g, '\\`')
                                    this.getContent()
                            }
                        }/>
                        <div className="social-share"></div>
                        <ShareButtons
                        />
                    </div>
                   :''}


               {/* <MDEditor.Markdown source={this.getContent()} />*/}

       {/*         <div className="social-share"></div>*/}
           {/*     <MarkdownEditor
                    value={this.getContent()}
                    visble='false'
                    previewProps='false'
                    options=''
                />*/}

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
    },
    Unmount(){
        dispatch(actionCreators.ArticleDel())
    }

})
export default connect(mapState,mapDispatch)(ArticleDetail)

//TODO 前端，移动端，小程序、app、node、php、Java、python、服务器、数据库、大数据、云计算、人工智能、UI、操作系统、爬虫、go、c/c++ c#