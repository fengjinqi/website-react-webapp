import React from 'react'
import {Icon, NavBar} from "antd-mobile";
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.css'
import './style.less'
import {Login as getToken,getInfo} from '../../api/user'
import {Toast} from 'antd-mobile'
import {setToken,getQueryString,getToken as getJwt,setUser} from '../../utils/utils'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            userrError:'',
            passError:''
        }
        this.Change = this.Change.bind(this)
    }
    componentDidMount() {
        if(getJwt()) this.props.history.push('/person')
    }

    submit(){
        var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if (!regex.test(this.state.username)) this.setState({userError:'请输入正确邮箱'})
        if (!this.state.password) this.setState({passError:'请输入密码'})
        if (regex.test(this.state.username)&&this.state.password){
            let data ={
                username:this.state.username,
                password:this.state.password
            }
            getToken(data).then(res=>{
                setToken(res.data.token)
                //Toast.success('登录成功',1)
                getInfo(getJwt()).then(res=>{
                    setUser(res.data[0])
                    if(getQueryString('next')){
                        this.props.history.push(`${getQueryString('next')}`)
                    }else{
                        this.props.history.push('/person')
                    }
                })
            }).catch(err=>{
                console.log(err.response)
               // Toast.fail(err.response.data.non_field_errors[0], 1);
            })
        }
    }
    Change(e){
        this.setState({
            userError:'',
            passError:''
        })
        if (e.target.name==='user'){
            this.setState({
                username:e.target.value
            })
        } else if(e.target.name === 'pass'){
            this.setState({
                password:e.target.value
            })
        }
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >登录</NavBar>
                <div className='login-container'>
                    <img src="../../static/img/logo.png" alt=""/>
                    <div className='login-form'>
                        <form className='from'>
                            <div className="login-form-main">
                                <span className='fa fa-envelope-o'></span>
                                <input type="email" name='user' value={this.state.username} onChange={this.Change} placeholder='请输入邮箱'required/>
                                <span  className='error'>{this.state.userError}</span>
                            </div>
                            <div className="login-form-main">
                                <span className='fa fa-key'></span>
                                <input type="password" name='pass' value={this.state.password} onChange={this.Change}  placeholder='请输入密码'required/>
                                <span className='error'>{this.state.passError}</span>
                            </div>
                            <div className="login-form-main">
                                <input type="button" onClick={this.submit.bind(this)} value='登录'/>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export  default Login