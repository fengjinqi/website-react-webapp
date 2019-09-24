import React,{Fragment} from 'react'
import {Icon, NavBar} from "antd-mobile";
import {connect} from 'react-redux'
import {getToken} from "../../utils/utils";
import {getMyInfoAxios} from "./store/actionCreator";
import {putInfoImg} from "../../api/user";
class Info extends React.Component{
    componentDidMount() {
        this.props.getInfo()
        this.ImagePicker = this.ImagePicker.bind(this)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.info)
    }

    /**
     * 上传头像
     * @param e
     * @constructor
     */
    ImagePicker(e){
        let form = new FormData()
        let reads =new FileReader()
        reads.readAsDataURL(this.lv.files[0])
        reads.onload=(e)=>{
            this.img.src=e.target.result
        }
        for (let i in e) {
          form.append(i,e[i])
        }
        form.append('list_pic',this.lv.files[0])
        putInfoImg(e.id,getToken(),form).then(res=>{})
    }
    render() {
        let {info} = this.props
        console.log(info)
        return(
            <Fragment>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >资料修改</NavBar>
                <div className='container info'>
                    <input type="text"placeholder='请输入'/>
                </div>
            </Fragment>
        )
    }

}
const mapState = (state)=>({
    info:state.my.info,
})
const mapDispatch =(dispatch)=>({
    getInfo(){
        if(getToken()){dispatch(getMyInfoAxios(getToken()))}
    }

})
export default connect(mapState,mapDispatch)(Info)