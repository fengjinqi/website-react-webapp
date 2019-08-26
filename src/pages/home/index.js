import React,{Component} from 'react'
import { ActivityIndicator, WingBlank, ListView} from 'antd-mobile';
import {connect} from 'react-redux'
import {actionCreators} from './store'
import './style.less'
class Home extends Component{
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: true,
        };
        this.changeState = this.changeState.bind(this)
    }
    changeState(list){
        console.log(list)
        //const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            //height:hei,
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }
      componentDidMount() {
        this.props.getHomeList()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.changeState(nextProps.list.results)
    }
    render() {
        const {isShow} = this.props
        const row =  (rowData, sectionID, rowID) => {

            return(
                <div className='list'>
                    <div>
                        <div className='list-header'>
                            <div className='list-header-left one-txt-cut'>
                                <img src={rowData.authors.user_imag?rowData.authors.user_imag:rowData.authors.user_image} alt=""/>
                                {rowData.authors.username}
                            </div>
                            <div className='list-header-right'><span>{rowData.category.name}</span></div>
                        </div>
                        <div className='list-title'>
                            <div className='list-title-left txt-cut'>{rowData.title}</div>
                            <div className='list-title-right'><img src={rowData.list_pic} alt=""/></div>
                        </div>
                        <div className='list-desc'>
                            {rowData.desc}
                        </div>
                        <div className='list-footer'>
                            <div className='list-footer-left'>
                                <span className='click'>{rowData.click_nums}</span>
                                <span className='comment'>{rowData.article_comment_set.length}{rowData.article_comment_set?rowData.article_comment_set.map(item=>{
                                        console.log(item)
                                    let count = item.length
                                     return item.articlecommentreply_set.map(res=>{
                                        return count+=res.length
                                    })
                                }):'0'}</span>
                            </div>
                            <div className='list-footer-right'>阅读全文→</div>
                        </div>
                    </div>
                </div>
            )
        };

        // if(list.results){

            return(
                <div>
                    <WingBlank>
                        <ActivityIndicator toast text="正在加载" animating={isShow} />
                    </WingBlank>
                    <ListView
                        ref={el => this.lv = el}
                        dataSource={this.state.dataSource}
                        renderRow={row}
                        useBodyScroll={this.state.useBodyScroll}
                       /* style={{
                            height: this.state.height,
                        }}*/
                        onScroll={() => { console.log('scroll'); }}
                    />
                </div>
            )
       // /* }else{
       //      return null
       //  }*/

    }
}
const mapState = (state)=>({
    list:state.home.articleList,
    isShow:state.home.isShow

})
const mapDispatch = (dispatch) => ({
      getHomeList(){
         dispatch(actionCreators.getHome())
    }
})
export default connect(mapState,mapDispatch)(Home)
