import React from 'react'
import {connect} from 'react-redux'
import {Icon, NavBar,List,SwipeAction,Toast,Modal} from "antd-mobile";
import {appGetMessage,appPutMessage} from '../../api/user'
import {getToken} from "../../utils/utils";

class myMessageList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            modal1:false,
            message:null
        }
    }
    componentDidMount() {
        this.getList()
    }
    getList(){
        Toast.loading('加载中...',0)
        appGetMessage(getToken()).then(res=>{
            Toast.hide()
            console.log(res)
            if (res.status===200){
                this.setState({
                    data:res.data
                })
            }
        })
    }
    update(e){
        e.has_read=true
        appPutMessage(getToken(),e,e.id).then(res=>{
            console.log(res)
           window.location.reload()
        })
    }
    go(e){
        if(e.url){
            window.location.href=window.location.origin+'/#'+e.url
        }else{
            this.setState({
                modal1:true,
                message:e.message
            })
        }

    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    render() {
        let data = this.state.data
        return(

            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                >消息列表</NavBar>
                <List style={{paddingTop:'45px'}}>
                    {this.state.data?
                        data.map((item,index)=>{
                            console.log(item)
                            if (item.has_read==true){
                                return(
                                    <SwipeAction
                                        key={item.id}
                                        style={{ backgroundColor: 'gray' }}
                                        autoClose
                                        right={[
                                            {
                                                text: '删除',
                                                onPress: () => this.del(item),
                                                style: { backgroundColor: '#F4333C', color: 'white' },
                                            },
                                        ]}
                      /*                  onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}*/
                                    >
                                        <List.Item
                                            // extra="More"
                                            arrow="horizontal"
                                            onClick={e =>this.go(item)}
                                        >
                                            {item.message}
                                        </List.Item>
                                    </SwipeAction>
                                )
                            } else{
                                return(
                                    <SwipeAction
                                        key={item.id}
                                        style={{ backgroundColor: 'gray' }}
                                        autoClose
                                        right={[
                                            {
                                                text: '已读',
                                                onPress: ()=>this.update(item),
                                                style: { backgroundColor: '#ddd', color: 'white' },
                                            },
                                            {
                                                text: '删除',
                                                onPress: () => this.del(item),
                                                style: { backgroundColor: '#F4333C', color: 'white' },
                                            },
                                        ]}
                                  /*      onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}*/
                                    >
                                        <List.Item
                                            arrow="horizontal"
                                            onClick={e =>this.go(item)}
                                        >
                                           <b className='commenting'style={{display:'inline-block'}}></b> {item.message}
                                        </List.Item>
                                    </SwipeAction>
                                )
                            }

                        }):''
                    }


                </List>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="提示"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                >

                    <p id='p' dangerouslySetInnerHTML={{ __html:this.state.message }}  />
                </Modal>
            </div>
        )
    }

}

export default connect()(myMessageList)