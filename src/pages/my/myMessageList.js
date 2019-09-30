import React from 'react'
import {connect} from 'react-redux'
import {Icon, NavBar,List,SwipeAction,Toast} from "antd-mobile";
import {appGetMessage} from '../../api/user'
import {Link} from "react-router-dom";
import {getToken} from "../../utils/utils";

class myMessageList extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount() {
        Toast.loading('加载中...',0)
        appGetMessage(getToken()).then(res=>{
            Toast.hide()
            console.log(res)
            if (res.status==200){
                this.setState({
                    data:res.data
                })
            }
        })
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
                                                onPress: () => console.log('delete'),
                                                style: { backgroundColor: '#F4333C', color: 'white' },
                                            },
                                        ]}
                                        onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}
                                    >
                                        <List.Item
                                            // extra="More"
                                            arrow="horizontal"
                                            onClick={e => console.log(e)}
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
                                                onPress: () => console.log('cancel'),
                                                style: { backgroundColor: '#ddd', color: 'white' },
                                            },
                                            {
                                                text: '删除',
                                                onPress: () => console.log('delete'),
                                                style: { backgroundColor: '#F4333C', color: 'white' },
                                            },
                                        ]}
                                        onOpen={() => console.log('global open')}
                                        onClose={() => console.log('global close')}
                                    >
                                        <List.Item
                                            // extra="More"
                                            arrow="horizontal"
                                            onClick={e => console.log(e)}
                                        >
                                           <b className='commenting'style={{display:'inline-block'}}></b> {item.message}
                                        </List.Item>
                                    </SwipeAction>
                                )
                            }

                        }):''
                    }

                </List>
            </div>
        )
    }

}

export default connect()(myMessageList)