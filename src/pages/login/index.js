import React from 'react'
import {Icon, NavBar} from "antd-mobile";
import '../../static/fonts/font-awesome-4.7.0/css/font-awesome.css'
import './style.less'
import {Login as getToken} from '../../api/user'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:''
        }
        this.Change = this.Change.bind(this)
    }
    submit(){

        let event = event || window.event
        event.preventDefault()
        alert()
        let data ={
            username:this.state.username,
            password:this.state.password
        }
        getToken(data).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })

    }
    Change(e){
        if (e.target.name=='user'){
            this.setState({
                username:e.target.value
            })
        } else if(e.target.name == 'pass'){
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
                            </div>
                            <div className="login-form-main">
                                <span className='fa fa-key'></span>
                                <input type="password" name='pass' value={this.state.password} onChange={this.Change}  placeholder='请输入密码'required/>
                            </div>
                            <div className="login-form-main">
                                <input type="submit" onSubmit={this.submit.bind(this)} value='登录'/>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        );
    }
}
export  default Login