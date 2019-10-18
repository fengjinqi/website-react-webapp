import React,{Component,Fragment} from 'react'
import {ForumList,ForumCategory} from '../../api/forum'
import {ListView, PullToRefresh, SearchBar} from "antd-mobile";
import {connect} from 'react-redux'
import {actionCreators} from "./store";
import {HashRouter, Link, NavLink} from "react-router-dom";
import {getCommentCount, getForumCommentCount, getUser} from "../../utils/utils";
import ReactDOM from "react-dom";
class Index extends Component{
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state ={
            dataSource,
            refreshing: true,
            isLoading: true,
            page:1,
            categrty:null,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            search:true,
        }
        this.changeState = this.changeState.bind(this)
    }
    changeState(list){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei,
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }
    /**
     *TODO 下拉刷新
     */
    onRefresh=()=>{
        this.setState({ refreshing: true, isLoading: true,page:1 });
        this.props.getHomeList()
    }
    /**
     * TODO 滚动加载数据
     */
    onEndReached = ()=>{
        if(this.state.page){
            this.setState({ refreshing: true, isLoading: true, });
            window.sessionStorage.getItem('forumserach')?this.props.getSerach(window.sessionStorage.getItem('forumserach'),this.state.page,true):this.props.getHomePage(this.state.page);

        }

    }
    componentDidMount() {
      this.props.getHomeList()
        ForumCategory().then(res=>{
            this.setState({
                categrty:res.data
            })
        })

    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.changeState(nextProps.list)
        this.setState({
            refreshing: false,
            isLoading: false,
            search:false,
            height:document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop-50,
            page:(nextProps.page.next ? ++this.state.page:'')
        });
    }
    serach(e){
        this.setState({
            search:true,
            page:1
        })
        window.sessionStorage.setItem('forumserach',e)
        console.log(e)
        this.props.getSerach(e,1,)
        document.getElementsByClassName('am-list-view-scrollview')[0].scrollTop=0

    }
    submit(e){

    }
    render() {
        const row =  (rowData, sectionID, rowID) => {
            return(
                <HashRouter>
                    <div className='list'>
                        <div>
                            <div className='list-header'>
                                <div className='list-header-left one-txt-cut'>
                                    {getUser()? <Link to={JSON.parse(getUser()).id===rowData.authors.id?`/person/`:`/person/${rowData.authors.id}`}>
                                            <img src={rowData.authors.user_imag?rowData.authors.user_imag:rowData.authors.user_image} alt=""/>
                                            {rowData.authors.username}
                                        </Link>
                                        :    <Link to={`/person/${rowData.authors.id}`}>
                                            <img src={rowData.authors.user_imag?rowData.authors.user_imag:rowData.authors.user_image} alt=""/>
                                            {rowData.authors.username}
                                        </Link>
                                    }
                                </div>
                                <div className='list-header-right'><span>{rowData.category.name}</span></div>
                            </div>
                            <div className='list-title list-title-active'>
                                <div className='list-title-left txt-cut list-main'>{rowData.title}</div>
                            </div>
                            <div className='list-desc'>
                                {rowData.desc}
                            </div>
                            <div className='list-footer'>
                                <div className='list-footer-left'>
                                    <span className='click'>{rowData.click_nums}</span>
                                    <span className='comment'>
                                    {getForumCommentCount(rowData)}
                                </span>
                                </div>
                                <div className='list-footer-right'><NavLink to={{pathname:`/forum/detail/${rowData.id}`}}>阅读全文→</NavLink></div>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            )
        };
        return(
            <Fragment>
                <div>
                    <SearchBar placeholder="Search" onSubmit={this.submit} />
                    <div className='nav'>
                        <div>
                            {this.state.categrty?this.state.categrty.map((item,index)=>{
                                return(
                                    <span key={item.id} onClick={()=>this.serach(item.id)}>{item.name}</span>
                                )
                            }):''}
                        </div>
                    </div>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderRow={row}
                        useBodyScroll={this.state.useBodyScroll}
                        style={{
                            height: this.state.height,
                        }}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {this.state.isLoading ? 'Loading...' : '没有更多数据了'}
                        </div>)}
                        pullToRefresh={<PullToRefresh

                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />}
                        onEndReached={this.onEndReached}
                    />
                </div>
            </Fragment>
        )
    }
}
const mapState = (state)=>({
    page:state.forum.forumList,
    list:state.forum.list
})
const mapDispatch =(dispatch)=>({
    getHomeList(){
        dispatch(actionCreators.getListActionAxios())
    },
    getHomePage(page){
        dispatch(actionCreators.getListActionPageAxios(page))
    },
    getSerach(name,page,type){
        dispatch(actionCreators.getSerachAxios(name,page,type))
    }
})
export default connect(mapState,mapDispatch)(Index)