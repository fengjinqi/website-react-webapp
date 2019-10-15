import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {getToken, getUser} from "../../../utils/utils";
import {ActivityIndicator, Icon, NavBar, WingBlank, Button, Toast} from "antd-mobile";
import {addMyFan, delMyFan} from './../../../api/article'
import {getOhtersFollows,delOhtersFollows} from './../../../api/user'
import {HashRouter, NavLink} from "react-router-dom";
let user_id =JSON.parse(getUser())?JSON.parse(getUser()).id:''
class OthersFollows extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow:true,
            list:null
        };
    }
    componentDidMount() {
        this.getInit()
    }
    componentWillUnmount() {
        this.setState({
            isShow:true,
            list:null
        })
    }
    getInit(){
        getOhtersFollows(this.props.match.params.id,user_id).then(res=>{
            this.setState({
                isShow:false,
                list:res.data
            })
        })
    }
    del(e){
        if(!getToken()){
            this.props.history.push(`/login/?next=/person/${this.props.match.params.id}`);
            return
        }
        let data={
            id:e.follow.id,
            access:e.access,
            user_id:user_id
        }
        console.log(data)
        delOhtersFollows(e.id,this.props.match.params.id,'follow',user_id,getToken(),data).then(res=>{
            Toast.info(res.data.message,1)
            this.getInit()
        })

    }
    add(e){
        if(!getToken()){
            this.props.history.push(`/login/?next=/person/${this.props.match.params.id}`);
            return
        }
        let data={
            follow:e.follow.id,
            fan:user_id
        }
        addMyFan(data,getToken()).then(res=>{
            console.log(res)
            Toast.success(res.data.message, 1);
            this.getInit()
        })
    }
    render() {
        const {list} = this.state
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
                    >关注</NavBar>


                </div>
                <div className='fan'>
                    {list?list.map(item=>{
                        return(
                            <div key={item.id} className='fan-main'>
                                <div><img src={item.follow.user_imag?item.follow.user_imag:item.follow.user_image?item.follow.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></div>
                                <div className='fan-main-user'>{item.follow.username}</div>
                                <div>{item.access?<Button type='primary' inline size="small" onClick={()=>this.del(item)}>已关注</Button>:<Button type='ghost'inline size="small" onClick={()=>this.add(item)}>关注</Button>}</div>

                            </div>
                        )
                    }):''}
                </div>

            </Fragment>
        )
    }
}
const mapState = (state)=>({

})
const mapDispatch =(dispatch)=>({
})
export default connect(mapState,mapDispatch)(OthersFollows)