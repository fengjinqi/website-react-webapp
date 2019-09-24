import React,{Fragment} from 'react'
import {Icon, ListView, NavBar} from "antd-mobile";
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
        const row = ()=>{
            if (info[0]){
                return (
                    <Fragment>
                        <li style={{position:'relative'}}>头像 <input type="file" onChange={()=>this.ImagePicker(info[0])}ref={img=>this.lv=img} accept='image/*'/><img ref={img=>this.img=img} src={info[0].user_imag?info[0].user_imag:info[0].user_image?info[0].user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></li>
                        <li>昵称 <span>{info[0].username}</span></li>
                        <li>职位 <span>{info[0].position}</span></li>
                        <li>简介 <span>{info[0].info}</span></li>
                    </Fragment>

                )
            }
        }
        return(
            <Fragment>
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
    info:state.my.info,
})
const mapDispatch =(dispatch)=>({
    getInfo(){
        if(getToken()){dispatch(getMyInfoAxios(getToken()))}
    }

})
export default connect(mapState,mapDispatch)(Info)