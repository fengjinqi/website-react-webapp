import React,{Component,Fragment}  from 'react'
import PropTypes from 'prop-types';
import {Icon, NavBar} from "antd-mobile";
import {Link} from "react-router-dom";
 class LoginMain extends Component{
     constructor(props){
         super(props)
         this.logou = this.logou.bind(this)
     }
     logou(){
         this.props.itemLogOut()
         console.log(this.props)
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