import React,{Fragment} from 'react'
import {Icon, NavBar,Toast} from "antd-mobile";
import {connect} from 'react-redux'
import {getToken} from "../../utils/utils";
import { createForm } from 'rc-form';
import {putInfoImg} from "../../api/user";
class InfoUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            info:'',
            position:'',
            list_pic:''
        }
        this.change = this.change.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        if(!this.props.location.state){
            this.props.history.goBack()
        }else{
            this.setState({
                username:this.props.location.state.username,
                //list_pic:this.props.location.state.user_imag,
                info:this.props.location.state.info,
                position:this.props.location.state.position
            })

        }


    }
    componentWillReceiveProps(nextProps, nextContext) {

    }
    submit(e){
        Toast.loading('loading',0)
        putInfoImg(e.id,getToken(),this.state).then(res=>{
            Toast.hide()
            if(res.status==200){
                Toast.success('修改成功',1)
                this.props.history.goBack()
            }else{
                Toast.success('修改失败',1)
            }
        })
    }
    change(e){
        this.setState({
            username:e.target.value
        })
    }
    render() {
        const { getFieldProps } = this.props.form;

        const {location} = this.props
        return(
            <Fragment>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={
                       <div onClick={()=>this.submit(this.props.location.state)}>保存</div>

                    }
                >资料修改</NavBar>
                <div className='infoupdate'>
                    {this.props.location.query}<input type="text" name='username' placeholder='请输入' value={this.state.username} onChange={this.change}/>
                  {/*  <List>
                        <List.Item>
                            <InputItem
                                {...getFieldProps('autofocus')}
                                clear
                                placeholder="请输入"
                                ref={el => this.autoFocusInst = el}
                                defaultValue={location.state.username}
                            >{location.query}</InputItem>
                        </List.Item>
                    </List>*/}

                </div>
            </Fragment>
        )
    }

}
const mapState = (state)=>({
})
const mapDispatch =(dispatch)=>({


})

const BasicInputExampleWrapper = createForm()(InfoUpdate);
export default connect(mapState,mapDispatch)(BasicInputExampleWrapper)