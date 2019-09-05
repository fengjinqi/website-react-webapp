import React from 'react'
import {Icon, NavBar} from 'antd-mobile'
import './style.less'
class Person extends React.Component{
    render() {
        return(
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >个人中心</NavBar>
                <div className="container">
                    <div className="container-header">
                        <div className='container-header-main'>
                            <img src="https://www.fengjinqi.com/static/img/pc-icon.png" alt=""/>
                            <span>登录/注册</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Person