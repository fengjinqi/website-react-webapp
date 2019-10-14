import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'

import {getToken} from "../../../utils/utils";
import {ActivityIndicator, Icon, NavBar, WingBlank, Button, Toast} from "antd-mobile";
import {getOhtersFan} from './../../../api/user'
import {addMyFan} from './../../../api/article'
import {HashRouter, NavLink} from "react-router-dom";

class OthersFan extends Component{
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
    getInit(){
        getOhtersFan(this.props.match.params.id,).then(res=>{
            console.log(res)
            this.setState({
                isShow:false,
                list:res.data
            })

        })
    }
    add(e){
        let data={
            follow:e.fan.id,
            fan:e.follow.id
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
                    >粉丝</NavBar>


                </div>
                <div className='fan'>
                    {list?list.map(item=>{
                        return(
                            <div key={item.id} className='fan-main'>
                                <div><img src={item.fan.user_imag?item.fan.user_imag:item.fan.user_image?item.fan.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></div>
                                <div className='fan-main-user'>{item.fan.username}</div>
                                <div>{item.access?<Button type='primary'inline size="small" disabled='disabled'>已关注</Button>:<Button type='primary'inline size="small" onClick={()=>this.add(item)}>关注</Button>}</div>

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

})
export default connect(mapState,mapDispatch)(OthersFan)