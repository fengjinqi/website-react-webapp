import React,{Fragment} from 'react'
import {ActivityIndicator, Icon, NavBar} from "antd-mobile";
import {connect} from 'react-redux'
import {getOhtersInfo} from "../../../api/user";
class OthersInfo extends React.Component{

    constructor(props){
        super(props)
        this.state={
            type:true,
            info:null
        }
    }
    componentDidMount() {
        this.getInfo(this.props.match.params.id)
    }
    getInfo(id){
        getOhtersInfo(id).then(res=>{
            this.setState({
                type:false,
                info:res.data
            })
        })
    }
    render() {
        let {info} = this.state
        const row = ()=>{
            if (info){
                return (
                    <Fragment>
                        <li style={{position:'relative'}}>头像 {this.state.type?<input type="file" onChange={()=>this.ImagePicker(info[0])} ref={img=>this.lv=img} accept='image/*'/>:''}<img ref={img=>this.img=img} src={info.user_imag?info.user_imag:info.user_image?info.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></li>
                        <li>昵称
                            <span>{info.username}</span>
                            </li>
                        <li>职位<span>{info.position}</span></li>
                        <li>简介  <span>{info.info}</span></li>
                    </Fragment>

                )
            }
        }
        return(
            <Fragment>
                <ActivityIndicator toast text="正在加载"animating={this.state.type}  />
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >个人信息</NavBar>
                <ul className='container info'>
                    {row()}
                </ul>
            </Fragment>
        )
    }

}
const mapState = (state)=>({
})
const mapDispatch =(dispatch)=>({


})
export default connect(mapState,mapDispatch)(OthersInfo)