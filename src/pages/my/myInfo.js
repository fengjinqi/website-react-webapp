import React,{Fragment} from 'react'
import {Icon, NavBar,Toast} from "antd-mobile";
import {connect} from 'react-redux'
import {getToken,delToken} from "../../utils/utils";
import {getMyInfoAxios} from "./store/actionCreator";
import {putInfoImg} from "../../api/user";
class Info extends React.Component{

    constructor(props){
        super(props)
        this.state={
            type:false,
            username:'',
            info:'',
            position:'',
            list_pic:''
        }
        this.change = this.change.bind(this)
    }
    componentDidMount() {
        this.props.getInfo()
        this.ImagePicker = this.ImagePicker.bind(this)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.info){
            this.setState({
                username:nextProps.info[0].username,
                info:nextProps.info[0].info,
                position:nextProps.info[0].position
            })
        }
    }

    /**
     * 上传头像
     * @param e
     * @constructor
     */
    ImagePicker(e){
        //let form = new FormData()
        let reads =new FileReader()
        reads.readAsDataURL(this.lv.files[0])
        reads.onload=(e)=>{
            this.img.src=e.target.result
        }
       /* let i;
        for ( i in e) {
          form.append(i,e[i])
        }
        form.append('list_pic',this.lv.files[0])*/
        this.setState({
            list_pic:this.lv.files[0]
        })

    }
    submit(e){
        let form = new FormData()
        form.append('info',this.state.info)
        form.append('username',this.state.username)
        form.append('position',this.state.position)
        form.append('list_pic',this.state.list_pic)
        Toast.loading('loading',0)
        putInfoImg(e.id,getToken(),form).then(res=>{
            Toast.hide()
            if(res.data.success=='ok'){
                delToken()
                Toast.success('修改成功，重新登录',1)
                this.props.history.push('/login')
            }else{
                Toast.success('修改失败',1)
            }
        })
    }
    change(e){
        if (e.target.name==='username'){
            this.setState({
                username:e.target.value
            })
        } else if(e.target.name === 'info'){
            this.setState({
                info:e.target.value
            })
        }else if(e.target.name === 'position'){
            this.setState({
                position:e.target.value
            })
        }
    }
    render() {
        let {info} = this.props
        const row = ()=>{
            if (info[0]){
                return (
                    <Fragment>
                        <li style={{position:'relative'}}>头像 {this.state.type?<input type="file" onChange={()=>this.ImagePicker(info[0])} ref={img=>this.lv=img} accept='image/*'/>:''}<img ref={img=>this.img=img} src={info[0].user_imag?info[0].user_imag:info[0].user_image?info[0].user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></li>
                      {/*  <li><Link to={{pathname:`/person/update/`,state:info[0],query:'昵称'}}>昵称 <span>{info[0].username}</span></Link></li>*/}
                        <li>昵称
                            {this.state.type?<input type="text" name='username' onChange={this.change} value={this.state.username} />:<span>{info[0].username}</span>}
                            </li>
                        <li>职位{this.state.type?<input type="text" name='position' onChange={this.change} value={this.state.position} />:<span>{info[0].position}</span>}</li>
                        <li>简介 {this.state.type? <textarea name="info" maxLength='100'style={{flex:'1',width:'100%',paddingLeft:'15px',height:'60px',border:'none'}} onChange={this.change} value={this.state.info}></textarea>:<span>{info[0].info}</span>}</li>
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
                    rightContent={
                        this.state.type?<div onClick={()=>this.submit(info[0])}>提交</div>:<div onClick={()=>this.setState({type:true})}>修改</div>

                    }
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