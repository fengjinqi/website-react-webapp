import React,{Fragment} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {Icon, NavBar,WingBlank,ActivityIndicator,PullToRefresh,ListView} from "antd-mobile";
import {HashRouter,NavLink} from 'react-router-dom'
import {getCommentCount} from "../../../utils/utils";
import {getOthersArticleListAxios, getOthersArticleListPageAxios} from "./../store/actionCreator";
const style={
    position:'initial'
}
class OthersArticles extends React.Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            isShow:true,
            page:1,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
        };
        this.changeState = this.changeState.bind(this)
    }
    changeState(list){
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei,
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }
    componentDidMount() {
        this.props.getInit(this.props.match.params.id)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.changeState(nextProps.list)
        this.setState({
            refreshing: false,
            isShow:false,
            isLoading: false,
            height:document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop,
            page:(nextProps.myArticlePage.next ? ++this.state.page:'')
        });

    }


    /**
     *TODO 下拉刷新
     */
    onRefresh=()=>{
        this.setState({ refreshing: true, isLoading: true,page:1 });
        this.props.getInit(this.props.match.params.id)
    }
    /**
     * TODO 滚动加载数据
     */
    onEndReached = ()=>{
        if(this.state.page){
            this.setState({ refreshing: true, isLoading: true, });
            this.props.getPage(this.props.match.params.id,this.state.page);
        }

    }
    render() {

        const row =  (rowData, sectionID, rowID) => {
            return(
                <HashRouter>
                    <div className='list'>
                        <div>
                            <div className='list-header'>
                                <div className='list-header-left one-txt-cut'>
                                    <img src={rowData.authors.user_imag?rowData.authors.user_imag:rowData.authors.user_image} alt=""/>
                                    {rowData.authors.username}
                                </div>
                                <div className='list-header-right'><span>{rowData.category.name}</span></div>
                            </div>
                            {rowData.list_pic?<div className='list-title'>
                                <div className='list-title-left txt-cut'>{rowData.title}</div>
                                <div className='list-title-right'><img src={rowData.list_pic} alt=""/></div>
                            </div>:<div className='list-title' style={{height:'auto'}}>
                                <div className='list-title-left txt-cut'style={{width:'100%'}}>{rowData.title}</div>

                            </div>}

                            <div className='list-desc'>
                                {rowData.desc}
                            </div>
                            <div className='list-footer'>
                                <div className='list-footer-left'>
                                    <span className='click'>{rowData.click_nums}</span>
                                    <span className='comment'>
                                    {getCommentCount(rowData)}
                                </span>
                                </div>
                                <div className='list-footer-right'><NavLink to={{pathname:`/article/detail/${rowData.id}`}}>阅读全文→</NavLink></div>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            )
        };
        return(
            <Fragment>
                <WingBlank>
                    <ActivityIndicator toast text="正在加载" animating={this.state.isShow}  />
                </WingBlank>
                <NavBar
                    style={style}
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >文章</NavBar>
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
            </Fragment>
        )
    }

}
const mapState=(state)=>({
    list:state.my.otherArticle,
    myArticlePage:state.my.otherArticlePage
})
const mapDispatch=(dispatch) =>({
    getInit(id){
        dispatch(getOthersArticleListAxios(id))
    },
    getPage(id,page){
        dispatch(getOthersArticleListPageAxios(id,page))
    }
})
export default connect(mapState,mapDispatch)(OthersArticles)







