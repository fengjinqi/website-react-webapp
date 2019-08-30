import React from 'react'
import {NavBar, Icon, WingBlank, ActivityIndicator} from 'antd-mobile'
import {getCommentCount} from '../../utils/utils'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import Editor from 'react-editor-md';
import  moment from 'moment'
import Share from '../../components/Share'
import {dateDiff} from '../../utils/time'

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
console.log(window.returnCitySN['cname'])

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


                                <img  src={list.authors.user_imag?list.authors.user_imag:list.authors.user_image} alt=""/>
                                <div className='detaile-header-info'>
                                    <h4>{list.authors.username}</h4>
                                    <span>{dateDiff(new Date(list.add_time.replace(/-/g, "/")).getTime())}发布</span>
                                    <span className='click'>阅读 {list.click_nums}</span>
                               {/*     <span className='comment'>{getCommentCount(list)}</span>*/}
                                </div>
                            </div>
                            <h1>{list.title}</h1>

                        </div>
                        <Editor.EditorShow config={
                            {
                                markdown: // testEditor.getMarkdown().replace(/`/g, '\\`')
                                    this.getContent()
                            }
                        }/>
                        <Share
                            title={document.title}
                        url={window.location.href}
                        image={list.authors.user_imag?list.authors.user_imag:list.authors.user_image}
                        description={document.getElementById('desc').getAttribute('content')}
                            origin={window.location.href}
                        sites={ ['weibo','qq','wechat','tencent','douban','qzone','linkedin','diandian','facebook','twitter','google']}
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