import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'
import { getFanAxios} from "./store/actionCreator";
import {getToken, getUser} from "../../utils/utils";
import {ActivityIndicator, Icon, NavBar, WingBlank, Button, Toast} from "antd-mobile";
import {addMyFan} from './../../api/article'
import {HashRouter, NavLink} from "react-router-dom";
import {delOhtersFollows} from "../../api/user";
let user_id =JSON.parse(getUser())?JSON.parse(getUser()).id:''
class MyForum extends Component{
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
    add(e){
        let data={
            follow:e.fan.id,
            fan:e.follow.id
        }
        addMyFan(data,getToken()).then(res=>{
            Toast.success(res.data.message, 1);
            this.props.getInit()

        })
    }
    del(e){
        if(!getToken()){
            this.props.history.push(`/login/?next=/person/${this.props.match.params.id}`);
            return
        }
        console.log(e)
        let data={
            id:e.fan.id,
            access:e.access,
            user_id:user_id
        }
        delOhtersFollows(e.id,user_id,'fan',user_id,getToken(),data).then(res=>{
            Toast.info(res.data.message,1)
            this.props.getInit()
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
                    >我的粉丝</NavBar>


                </div>
                <div className='fan'>
                    {list.results?list.results.map(item=>{
                        return(
                            <div key={item.id} className='fan-main'>
                                <div><img src={item.fan.user_imag?item.fan.user_imag:item.fan.user_image?item.fan.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></div>
                                <div className='fan-main-user'>{item.fan.username}</div>
                                <div>{item.access?<Button type='primary'inline size="small"onClick={()=>this.del(item)}>已关注</Button>:<Button type='ghost'inline size="small" onClick={()=>this.add(item)}>关注</Button>}</div>

                            </div>
                        )
                    }):''}
                </div>

            </Fragment>
        )
    }
}
const mapState = (state)=>({
    list:state.my.myFan,
})
const mapDispatch =(dispatch)=>({
    getInit() {
        dispatch(getFanAxios(getToken()))
    },
})
export default connect(mapState,mapDispatch)(MyForum)