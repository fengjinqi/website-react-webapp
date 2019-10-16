import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {getFollowAxios} from "./store/actionCreator";
import {getToken} from "../../utils/utils";
import {ActivityIndicator, Icon, NavBar, WingBlank, Button, Toast} from "antd-mobile";
import {delMyFan} from './../../api/article'
import { Link} from "react-router-dom";

class MyFollows extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isShow:true,
        };
    }
    componentDidMount() {
        this.props.getInit()
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isShow:false,
        });
    }
    del(e){
        delMyFan(e,getToken()).then(res=>{
            if(res.status===204){
                Toast.success('取消关注成功', 1);
                this.props.getInit()
            }
        })
    }
    render() {
        const {list} = this.props
        return(
            <Fragment>
                <WingBlank>
                    <ActivityIndicator toast text="正在加载" animating={this.state.isShow}  />
                </WingBlank>
                <div>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >我的关注</NavBar>


                </div>
                <div className='fan'>
                    {list.results?list.results.map(item=>{
                        return(
                            <div key={item.id} className='fan-main'>
                                <div>
                                    <Link to={`/person/${item.follow.id}`}>
                                            <img src={item.follow.user_imag?item.follow.user_imag:item.follow.user_image?item.follow.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></Link>

                                </div>
                                <div className='fan-main-user'>{item.follow.username}</div>
                                <div><Button type='primary'inline size="small" onClick={()=>this.del(item.id)}>取消关注</Button></div>

                            </div>
                        )
                    }):''}
                </div>

            </Fragment>
        )
    }
}
const mapState = (state)=>({
    list:state.my.myFollow,
})
const mapDispatch =(dispatch)=>({
    getInit() {
        dispatch(getFollowAxios(getToken()))
    }
})
export default connect(mapState,mapDispatch)(MyFollows)