import React from 'react'
import {NavBar, Icon, WingBlank, ActivityIndicator,Toast,Button} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import Editor from 'react-editor-md';
import { addMyFan, delMyFan} from './../../api/article'
import {ForumComment,ForumCommentRep} from './../../api/forum'
import {getOhtersFan} from './../../api/user'
import Share from '../../components/Share'
import {dateDiff} from '../../utils/time'

import '../../static/css/share.min.css'
import {getToken, getUser} from "../../utils/utils";

class ForumDetail extends React.Component{
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
            user:false,
            follows:false,
            follows_id:null
        }
        this.Change = this.Change.bind(this)
    }
    componentDidMount() {
        let id = this.props.match.params.id

        this.props.init(id)


    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.list)
        document.title = `论坛-${nextProps.list.forum.detail.title}`;
        document.getElementById('desc').setAttribute('content',nextProps.list.forum.detail.desc)
        document.getElementById('keywords').setAttribute('content',nextProps.list.forum.detail.keywords)
        window.sessionStorage.setItem('k',nextProps.list.forum.detail.content)

        if (getToken()&&JSON.parse(getUser()).id===nextProps.list.forum.detail.authors.id)this.setState({user:true})
        getOhtersFan(nextProps.list.forum.detail.authors.id,getUser()?JSON.parse(getUser()).id:'').then(res=>{
            this.setState({
                isShow:false
            })
            if (!getUser()) return
            if(res.data.length>0){
                for (let item in res.data){
                    if(res.data[item].fan.id===JSON.parse(getUser()).id){
                        this.setState({follows:true,follows_id:res.data[item].id})
                    }
                }
            }

        })
    }
    del(){
        if(!getToken())this.props.history.push(`/login/?next=/forum/detail/${this.props.match.params.id}`)
        delMyFan(this.state.follows_id,getToken()).then(res=>{
            if(res.status===204){
                Toast.success('取消关注成功', 1);
                this.setState({follows:false})
            }
        })
    }
    add(e){
        if(!getToken())this.props.history.push(`/login/?next=/forum/detail/${this.props.match.params.id}`)
        let data={
            follow:e.id,
            fan:JSON.parse(getUser()).id
        }
        addMyFan(data,getToken()).then(res=>{
            this.props.init(this.props.match.params.id)
            Toast.success(res.data.message, 1);
        })
    }
    getContent = ()=>{
        return this.props.list.forum.detail.content
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
            this.props.history.push(`/login/?next=/forum/detail/${this.props.match.params.id}`)
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
            data.forums = `${this.props.match.params.id}`
            data.comments = this.state.vue
            data.user =JSON.parse(getUser()).id
            data.url = `/forum/detail/${this.props.match.params.id}`
            data.cip = window.returnCitySN['cip']
            data.address = window.returnCitySN['cname']
            ForumComment(getToken(),data).then(res=>{
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
        if(!getToken())this.props.history.push(`/login/?next=/forum/detail/${this.props.match.params.id}`)
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
            data.url = `/forum/detail/${this.props.match.params.id}`
            data.cip = window.returnCitySN['cip']
            data.address = window.returnCitySN['cname']
            data.to_Parent_Comments =this.state.rep.user.id
            data.forums =this.state.rep.forums
            data.parent_comments =this.state.rep.parent_comments
            ForumCommentRep(data,getToken()).then(res=>{
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

        let list = this.props.list.forum.detail
        const comm=()=>{
            return(
                <div className='commit'>
                    <p className='commit-p'></p>
                    <div className="commit-main">
                        {list.comment_set.map((item,index)=>{
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
                                            <span onClick={()=>this.setModel(item)} className={item.parent_comment_set.length>0?'active':''}>{item.parent_comment_set.length>0?item.parent_comment_set.length:''}回复</span>
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
                >论坛</NavBar>
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
                                {this.state.follows?<Button type="primary" inline size="small" style={{ marginRight: '4px' }} onClick={()=>this.del()}>已关注</Button>:<Button type="ghost" inline size="small" style={{ marginRight: '4px' }} onClick={()=>this.add(list.authors)}>关注</Button>}


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
                            </form>:<Link to={`/login/?next=/forum/detail/${this.props.match.params.id}`}>登录后可评论</Link>}

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
                                        {this.state.comm.parent_comment_set.map((item,index)=>{
                                            return(
                                                <div key={index} className='commit-body'>
                                                    <div className='commit-body-img'>
                                                        <img src={item.user.user_imag?item.user.user_imag:item.user.user_image?item.user.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/>

                                                    </div>
                                                    <div className='commit-body-text'>
                                                        <h4>{item.user.username}</h4>
                                                        <p>
                                                            回复 <span className='user'>{item.to_Parent_Comments.username}</span> {item.comments}
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
        dispatch(actionCreators.getgetDetailePageAxios(id))
    },
    Unmount(){
        dispatch(actionCreators.ArticleDel())
    }

})
export default connect(mapState,mapDispatch)(ForumDetail)

//TODO 前端，移动端，小程序、app、node、php、Java、python、服务器、数据库、大数据、云计算、人工智能、UI、操作系统、爬虫、go、c/c++ c#