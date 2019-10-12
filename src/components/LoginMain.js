import React,{Component,Fragment}  from 'react'
import PropTypes from 'prop-types';
import {Icon, NavBar,List,Modal} from "antd-mobile";
import {Link} from "react-router-dom";
import {getToken} from '../utils/utils'
import Button from "antd-mobile/lib/button";
const Item = List.Item
const alert = Modal.alert;
 class LoginMain extends Component{

    render() {
        console.log(this.props)
        return(

            <Fragment>
                {this.props.type?  <div>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                        rightContent={
                            this.props.name?<Link to='/person/message' style={{color:'#fff'}}><div className=' fa  fa-commenting-o'>{this.props.message.count>0?<b className='commenting'></b>:''}</div></Link>:''
                        }
                    >个人中心</NavBar>
                    <div className="container">
                        <div className="container-header">
                            <div className='container-header-main'>
                                <img src={this.props.image} alt=""/>
                                {this.props.name?<Link to='/person/info' className='user'><span>{this.props.name}</span><Icon type='right
'/></Link>:<Link to='/login' className='user'>登录/注册</Link>}

                            </div>
                        </div>

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
                            onClick={() => {getToken()?this.props.history.push('/person/myFollows'):this.props.history.push('/login')}}
                        >
                            我的关注
                        </Item>
                        {getToken()?<Button type='warning' style={{marginTop:20}}  onClick={() =>
                            alert('提示', '确认退出登录?', [
                                { text: '取消', onPress: () => console.log('cancel') },
                                {
                                    text: '确认',
                                    onPress: () =>this.props.itemLogOut()
                                    /*new Promise((resolve) => {
                                        delToken()
                                        Toast.info('退出成功', 1);
                                        _this()
                                        resolve()

                                        //setTimeout(resolve, 1000);
                                    }),*/
                                },
                            ])
                        }>退出登录</Button>:''}
                    </div>
                </div>:  <div>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >个人中心</NavBar>
                    <div className="container">
                        <div className="container-header">
                            <div className='container-header-main'>
                                <img src={this.props.image} alt=""/>
                                <Link to='/person/info' className='user'><span>{this.props.name}</span><Icon type='right
'/></Link>

                            </div>
                        </div>

                        <Item
                            arrow="horizontal"
                            thumb="https://www.fengjinqi.com/static/img/文章.png"
                            onClick={() => {getToken()?this.props.history.push('/person/article'):this.props.history.push('/login')}}
                        >
                            文章
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb="https://www.fengjinqi.com/static/img/帖子.png"
                            onClick={() => {getToken()?this.props.history.push('/person/forum'):this.props.history.push('/login')}}
                        >
                            帖子
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb="https://www.fengjinqi.com/static/img/我的粉丝.png"
                            onClick={() => {getToken()?this.props.history.push('/person/myFan'):this.props.history.push('/login')}}
                        >
                            粉丝
                        </Item>
                        <Item
                            arrow="horizontal"
                            thumb="https://www.fengjinqi.com/static/img/我的关注.png"
                            onClick={() => {getToken()?this.props.history.push('/person/myFollows'):this.props.history.push('/login')}}
                        >
                            关注
                        </Item>
                    </div>
                </div>}


            </Fragment>
            )

    }

}
LoginMain.propsTypes = {
    name:PropTypes.string,
    image:PropTypes.string,
    itemLogOut:PropTypes.func,
    history:PropTypes.func,
    type:PropTypes.bool


}
LoginMain.defaultProps = {
     image:'https://www.fengjinqi.com/static/img/pc-icon.png',
     type:true
}
export default LoginMain