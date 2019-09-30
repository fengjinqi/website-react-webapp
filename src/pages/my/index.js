import React,{Fragment} from 'react'
import {ActivityIndicator, Toast, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import './style.less'
import {getToken,delToken} from '../../utils/utils'
import {getMessageCountAxios, getMyInfoAxios} from './store/actionCreator'
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
    componentWillUnmount() {
        this.setState({
            type:false,
            _visite:false
        })
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps)
        if(prevProps.info.detail&&prevProps.info.detail==="Signature has expired."){
            delToken()
            Toast.fail('签名已过期,请重新登录',1)
            this.props.history.push('/login')
        }
    }*/
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.info.detail && nextProps.info.detail==="Signature has expired." || nextProps.info.detail && nextProps.info.detail==="Invalid signature."){
            delToken()
            Toast.fail('签名已过期,请重新登录',1)
            this.props.history.push('/login')
        }
        if(nextProps.info&&nextProps.myMessageType) this.setState({
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
        const {info,myMessageType} = this.props
        console.log(info)
        if (!getToken())return   <LoginMain  history={this.props.history}/>
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
                    {this.state._visite&&info[0]?

                        <LoginMain
                            name={info[0].username}
                            image={info[0].user_imag?info[0].user_imag:info[0].user_image?info[0].user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'}
                            itemLogOut={this.logout.bind(this)}
                            history={this.props.history}
                            getInfo={this.props.getInfo.bind(this)}
                            message={myMessageType}
                        />:
                        <LoginMain

                            history={this.props.history}/>
                    }
                </Fragment>


            )
        }


    }

}

const mapState=(state)=>({
    info:state.my.info,
    error:state.my.error,
    isShow:state.my.isShow,
    myMessageType:state.my.myMessageType
})
const mapDispatch=(dispatch)=>({
    getInfo(){
        if(getToken()){
            dispatch(getMyInfoAxios(getToken()))
            dispatch(getMessageCountAxios(getToken()))
        }
    }
})
export default connect(mapState,mapDispatch)(Person)