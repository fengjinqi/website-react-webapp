import React,{Fragment} from 'react'
import {ActivityIndicator, Icon, NavBar, Toast, WingBlank} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './style.less'
import {getToken,delToken} from '../../utils/utils'
import {getMyInfoAxios} from './store/actionCreator'
import LoginMain from '../../components/LoginMain'
class Person extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type:false,
            _visite:false
        }
    }
    componentDidMount() {
        this.props.getInfo()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.info.detail&&prevProps.info.detail==="Signature has expired."){
            delToken()
            Toast.fail('签名已过期,请重新登录',1)
            this.props.history.push('/login')
        }
    }
 /*   shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.info)return true

    }*/

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.info) this.setState({
            type:true,
            _visite:true
        })
    }
    logout=()=>{
        delToken()
        Toast.fail('退出成功',1)
        this.setState({
            _visite:false
        })
    }
    render() {
        const {info,isShow} = this.props
        console.log(isShow)
        if (!getToken())return   <LoginMain/>
        if (!this.state.type){
            return (
                <div>
                    <WingBlank>
                        <ActivityIndicator toast text="正在加载"  />
                    </WingBlank>
                </div>
            )
        } else{
            return(
                <Fragment>
                    {this.state._visite?

                        <LoginMain
                            name={info[0].username}
                            image={info[0].user_imag?info[0].user_imag:info[0].user_image?info[0].user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'}
                            itemLogOut={this.logout.bind(this)}
                        />:
                        <LoginMain/>

                    }

                    {/* <Fragment>
                {this.state.type?
                    <div>
                        <NavBar
                            mode="dark"
                            icon={<Icon type="left" />}
                            onLeftClick={() => this.props.history.goBack()}
                            rightContent={
                                info[0]?<div onClick={this.logout}>退出</div>:''

                            }
                        >个人中心</NavBar>
                        <div className="container">
                            <div className="container-header">
                                {info[0]?<div className='container-header-main'>
                                    <img src={info[0].user_imag?info[0].user_imag:info[0].user_image?info[0].user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/>
                                    <Link to='/login'>{info[0].username}</Link>
                                </div>:
                                    <div className='container-header-main'>
                                        <img src='https://www.fengjinqi.com/static/img/pc-icon.png' alt=""/>
                                        <Link to='/login'>登录/注册</Link>
                                    </div>}

                            </div>
                        </div>

                    </div>
                    :null}


                    </Fragment>*/}
                </Fragment>


            )
        }


    }

}

const mapState=(state)=>({
    info:state.my.info,
    error:state.my.error,
    isShow:state.my.isShow
})
const mapDispatch=(dispatch)=>({
    getInfo(){
        if(getToken()){dispatch(getMyInfoAxios(getToken()))}
    }
})
export default connect(mapState,mapDispatch)(Person)