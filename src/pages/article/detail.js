import React from 'react'
import {NavBar, Icon, WingBlank, ActivityIndicator} from 'antd-mobile'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import Editor from 'react-editor-md';

import Share from '../../components/Share'
import {dateDiff} from '../../utils/time'


import './style.less'
import '../../static/css/share.min.css'
class ArticleDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isShow:true,
            _visite:false
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
    show=()=>{
        this.setState({
            _visite:!this.state._visite
        })
    }
    render() {

        let {list} = this.props.list.article
        const comm=()=>{
            return(
                <div className='commit'>
                    <p className='commit-p'></p>
                    <div className="commit-main">
                        {list.article_comment_set.map((item,index)=>{
                            return(
                                <div key={index} className='commit-body'>
                                    <div className='commit-body-img'>
                                        <img src={item.user.user_imag?item.user.user_imag:item.user.user_image} alt=""/>

                                    </div>
                                    <div className='commit-body-text'>
                                        <h4>{item.user.username}</h4>
                                        <p>
                                            {item.comments}
                                        </p>
                                        <p>{dateDiff(new Date(item.add_time.replace(/-/g, "/")).getTime())}
                                            <span className={item.articlecommentreply_set.length>0?'active':''}>{item.articlecommentreply_set.length>0?item.articlecommentreply_set.length:''}回复</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        return(
            <div>
                <WingBlank>
                    <ActivityIndicator toast text="正在加载" animating={this.state.isShow} />
                </WingBlank>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                        <Icon key="1" type="ellipsis"onClick={this.show} />
                    }
                >文章</NavBar>
                {!this.state.isShow?
                    <div className="main">
                        <div className='detail-header'>
                            <div className='detaile-header-img'>
                                <img src={list.authors.user_imag?list.authors.user_imag:list.authors.user_image} alt=""/>
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
                                markdown: this.getContent()
                            }
                        }/>
                        {comm()}
                        <div className="footer">
                            <input type="text"placeholder='说点什么吧'/>
                        </div>
                        <div id='model' onClick={()=>this.setState({_visite:false})} className={
                            this.state._visite
                            ?"animated-fade-in" : "animated-fade-out"
                        }>
                            <div className='model-main'
                                 onClick={e => {
                                e.stopPropagation();
                            }}>
                                <Share
                                    className={
                                        this.state._visite
                                            ? "animated-slide-in-up"
                                            : "animated-slide-out-down"
                                    }
                                    title={document.title}
                                    url={window.location.href}
                                    image={list.authors.user_imag?list.authors.user_imag:list.authors.user_image}
                                    description={document.getElementById('desc').getAttribute('content')}
                                    origin={window.location.href}
                                    sites={ ['weibo','qq','wechat','douban','qzone']}
                                />
                                <p className='close' onClick={()=>this.setState({_visite:false})}>取消</p>
                            </div>
                        </div>
                    </div>

                   :''}

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