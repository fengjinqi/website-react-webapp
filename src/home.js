import React from 'react';
import {withRouter,NavLink} from 'react-router-dom'

const footer ={
    display:'flex',
    width:'100%',
    height:'50px',
    justifyContent: 'space-around',
    position:'fixed',
    bottom:'0',
    alignItems: 'center',
    background:'#fff'
}
class Main extends React.Component {

    render() {
        return (
            <div className="App">
                {this.props.children}
                <div style={footer}>
                    <NavLink to='/'className="tab" activeClassName="selected">文章</NavLink>
                    <NavLink to='person' className="tab" activeClassName="selected">我的</NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);
