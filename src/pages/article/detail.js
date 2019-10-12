import React from 'react'
import {NavBar, Icon, WingBlank, ActivityIndicator,Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import Editor from 'react-editor-md';
import {addCommt,addCommtRep} from './../../api/article'
import Share from '../../components/Share'
import {dateDiff} from '../../utils/time'
import './style.less'
import '../../static/css/share.min.css'
import {getToken, getUser} from "../../utils/utils";
class ArticleDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isShow:true,
            _visite:false,
            model:false,
            comm:null,
            vue:'',
            type:false,
            rep:null,
            user:false
        }
        this.Change = this.Change.bind(this)
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
        if (getToken()&&JSON.parse(getUser()).id===nextProps.list.article.list.authors.id)this.setState({user:true})
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
    setModel(e){
        if(getToken()){
            this.setState({
                model:true,
                comm:e
            })
        }else{
            this.props.history.push(`/login/?next=/article/detail/${this.props.match.params.id}`)
        }
    }
    Change(e){
        this.setState({
            vue:e.target.value
        })
    }
    sub(e){
        e.preventDefault()
        if(getToken()){
            if (this.state.vue.trim().length==0)return
            let data={}
            data.article = `${this.props.match.params.id}`
            data.comments = this.state.vue
            data.user =JSON.parse(getUser()).id
            data.url = `/article/detail/${this.props.match.params.id}`
            data.cip = window.returnCitySN['cip']
            data.address = window.returnCitySN['cname']
            addCommt(getToken(),data).then(res=>{
                Toast.success('评论成功',1)
                this.props.init(this.props.match.params.id)
                this.setState({
                    vue:'',
                    rep:null
                })
            }).catch(err=>{
                console.log(err.response)
            })
        }else{
            Toast.fail('未登录',1)
        }
    }
    reple(e){
        this.setState({
            type:true,
            rep:e
        },()=>{
            this.textInput.focus();
        })
    }
    subRep(e){
        e.preventDefault()
        if(getToken()){
            if (this.state.vue.trim().length==0)return
            let data={}
            data.comments = this.state.vue
            data.user =JSON.parse(getUser()).id
            data.url = `/article/detail/${this.props.match.params.id}`
            data.cip = window.returnCitySN['cip']
            data.address = window.returnCitySN['cname']
            data.to_uids =this.state.rep.user.id
            data.aomments_id =this.state.rep.aomments_id
            addCommtRep(getToken(),data).then(res=>{
                console.log(res)
                this.props.init(this.props.match.params.id)
                this.setState({
                    vue:'',
                    rep:null,
                    model:false
                })
                Toast.success('回复成功',1)
            })
        }else{
            Toast.fail('未登录',1)
        }
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

                                        <Link to={`/person/${item.user.id}`}><img src={item.user.user_imag?item.user.user_imag:item.user.user_image?item.user.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></Link>

                                    </div>
                                    <div className='commit-body-text'>
                                        <h4>{item.user.username}</h4>
                                        <p>
                                            {item.comments}
                                        </p>
                                        <p>{dateDiff(new Date(item.add_time.replace(/-/g, "/")).getTime())}
                                            <span onClick={()=>this.setModel(item)} className={item.articlecommentreply_set.length>0?'active':''}>{item.articlecommentreply_set.length>0?item.articlecommentreply_set.length:''}回复</span>
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
                                {this.state.user?<Link to={`/person/`}>
                                    <img src={list.authors.user_imag?list.authors.user_imag:list.authors.user_image} alt=""/></Link>
                                    :<Link to={`/person/${list.authors.id}`}>
                                        <img src={list.authors.user_imag?list.authors.user_imag:list.authors.user_image} alt=""/>
                                    </Link>}

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
                                markdown: this.getContent(),
                            }
                        }/>
                        {comm()}
                        <div className="footer">
                            {getToken()?<form action='' onSubmit={(e)=>this.sub(e)}>
                                <input type="text" value={this.state.vue} onChange={this.Change} placeholder='说点什么吧'/>
                            </form>:<Link to={`/login/?next=/article/detail/${this.props.match.params.id}`}>登录后可评论</Link>}

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
                        {this.state.model?
                            <div className={  this.state.model
                                ?" model animated-fade-in" : "animated-fade-out"}>
                                <NavBar
                                    icon={<Icon type="down" />}
                                    onLeftClick={() => this.setState({model:false})}
                                >回复</NavBar>

                                <div className='commit' style={{marginTop:50}}>
                                    <div className="commit-main">
                                        <div className='commit-body'>
                                            <div className='commit-body-img'>
                                                        <img src={this.state.comm.user.user_imag?this.state.comm.user.user_imag:this.state.comm.user.user_image?this.state.comm.user.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/>
                                                    </div>
                                            <div className='commit-body-text'>
                                                        <h4>{this.state.comm.user.username}</h4>
                                                        <p>
                                                            {this.state.comm.comments}
                                                        </p>
                                                        <p className='timer'>{dateDiff(new Date(this.state.comm.add_time.replace(/-/g, "/")).getTime())}
                                                        <span onClick={()=>this.reple(this.state.comm)}>回复</span>
                                                        </p>
                                                    </div>
                                        </div>
                                        {this.state.comm.articlecommentreply_set.map((item,index)=>{
                                            return(
                                                <div key={index} className='commit-body'>
                                                    <div className='commit-body-img'>
                                                        <img src={item.user.user_imag?item.user.user_imag:item.user.user_image?item.user.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/>

                                                    </div>
                                                    <div className='commit-body-text'>
                                                        <h4>{item.user.username}</h4>
                                                        <p>
                                                            回复 <span className='user'>{item.to_uids.username}</span> {item.comments}
                                                        </p>
                                                        <p className='timer'>{dateDiff(new Date(item.add_time.replace(/-/g, "/")).getTime())}
                                                            <span onClick={()=>this.reple(item)}>回复</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {this.state.type?<form action=""  className='footer' onSubmit={(e)=>this.subRep(e)}>
                                    <input type="text" placeholder='说点什么吧' value={this.state.vue} onChange={this.Change} onBlur={()=>this.setState({type:false,vue:'',rep:null})} ref={(input) => { this.textInput = input; }} />
                                </form>:''}

                            </div>
                            :null}

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