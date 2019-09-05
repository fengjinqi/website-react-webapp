import React from 'react';
import {withRouter,NavLink} from 'react-router-dom'
import './static/css/comm.less';


/*function App() {
  return (
    <div className="App">
        <Home/>
        {console.log(this)}

    </div>
  );
}*/


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
class App extends React.Component {

    render() {
        return (
            <div className="App">
    {/*            <Home/>*/}
                {this.props.children}
               {/* <div style={footer}>
                    <NavLink to='/'>文章</NavLink>
                    <NavLink to='person'>我的</NavLink>
                </div>*/}
            </div>
        );
    }
}

export default withRouter(App);
