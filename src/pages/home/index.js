import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import { ActivityIndicator, WingBlank, ListView} from 'antd-mobile';
import {connect} from 'react-redux'
import {actionCreators} from './store'

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
            useBodyScroll: false,
        };
    }
    changeState(list){
        console.log(list)
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
            height:hei,
            dataSource: this.state.dataSource.cloneWithRows(list)
        })
    }
    async componentDidMount() {
        await this.props.getHomeList()
        setTimeout(()=>{
            this.changeState(this.props.list.results)
        },2000)
    }



    onRefresh(){}

    render() {
        const {list,isShow} = this.props
        const row =  (rowData, sectionID, rowID) => {
        return(
            <div>
                {console.log(rowData, sectionID, rowID)}
                <p>{rowData.title}</p>
            </div>
        )
        };

        return(
            <div>
               {console.log(list.results)}
                <WingBlank>
                <ActivityIndicator toast text="正在加载" animating={this.props.isShow} />
                </WingBlank>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    pageSize={4}
                    useBodyScroll={this.state.useBodyScroll}
                    style={{
                        height: this.state.height,

                    }}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReachedThreshold={10}
                />
            </div>
        )
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
