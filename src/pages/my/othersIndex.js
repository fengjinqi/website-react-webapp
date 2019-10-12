import React,{Fragment} from 'react'
import {ActivityIndicator, Toast, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import './style.less'
import {getOhtersInfo} from './../../api/user'
import {getToken, delToken, delUser, setUser, getUser} from '../../utils/utils'
import {getMessageCountAxios, getMyInfoAxios} from './store/actionCreator'
import LoginMain from '../../components/LoginMain'
class OthersPerson extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type:false,
            data:null
        }
    }
    componentDidMount() {
        this.getInfo(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.setState({
            type:false,
        })
    }
    getInfo(id){
        getOhtersInfo(id).then(res=>{
            console.log(res)
            this.setState({
                type:true,
                data:res.data
            })
        })
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }
    render() {
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
                   <LoginMain
                        name={this.state.data.username}
                        type={false}
                        image={this.state.data.user_imag?this.state.data.user_imag:this.state.data.user_image?this.state.data.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'}

                   />
                </Fragment>


            )
        }


    }

}

const mapState=(state)=>({

})
const mapDispatch=(dispatch)=>({
})
export default connect(mapState,mapDispatch)(OthersPerson)