import React,{Component,Fragment}  from 'react'
import PropTypes from 'prop-types';
import {Icon, NavBar,List} from "antd-mobile";
import {Link} from "react-router-dom";
import {getToken} from '../utils/utils'
const Item = List.Item
 class LoginMain extends Component{
     constructor(props){
         super(props)
         this.logou = this.logou.bind(this)
     }
     logou(){
         this.props.itemLogOut()

     }
    render() {
        return(
            <Fragment>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                        this.props.name?<div onClick={ this.props.itemLogOut}>退出</div>:''

                    }
                >个人中心</NavBar>
                <div className="container">
                    <div className="container-header">
                        <div className='container-header-main'>
                                <img src={this.props.image} alt=""/>
                            {this.props.name?<span>{this.props.name}</span>:<Link to='/login'>登录/注册</Link>}

                            </div>
                           {/* <div className='container-header-main'>
                                <img src='https://www.fengjinqi.com/static/img/pc-icon.png' alt=""/>
                                <Link to='/login'>登录/注册</Link>
                            </div>*/}

                    </div>
                    {console.log(this.props)}
                    <Item
                        arrow="horizontal"
                        thumb="https://www.fengjinqi.com/static/img/文章.png"
                        onClick={() => {getToken()?this.props.history.push('/person/article'):this.props.history.push('/login')}}
                    >
                        我的文章
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://www.fengjinqi.com/static/img/帖子.png"
                        onClick={() => {getToken()?this.props.history.push('/person/forum'):this.props.history.push('/login')}}
                    >
                        我的帖子
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://www.fengjinqi.com/static/img/我的粉丝.png"
                        onClick={() => {getToken()?this.props.history.push('/person/myFan'):this.props.history.push('/login')}}
                    >
                        我的粉丝
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://www.fengjinqi.com/static/img/我的关注.png"
                        onClick={() => {alert()}}
                    >
                        我的关注
                    </Item>
                    <Item
                        arrow="horizontal"
                        thumb="https://www.fengjinqi.com/static/img/设 置.png"
                        onClick={() => {alert()}}
                    >
                        设置
                    </Item>
                </div>
            </Fragment>
            )

    }

}
LoginMain.propsTypes = {
    name:PropTypes.string,
    image:PropTypes.string,
    itemLogOut:PropTypes.func
}
LoginMain.defaultProps = {
     image:'https://www.fengjinqi.com/static/img/pc-icon.png'
}
export default LoginMain