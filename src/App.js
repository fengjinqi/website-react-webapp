import React from 'react';
import {withRouter} from 'react-router-dom'
import './static/css/comm.less';


/*function App() {
  return (
    <div className="App">
        <Home/>
        {console.log(this)}

    </div>
  );
}*/
class App extends React.Component {

    render() {
        return (
            <div className="App">
    {/*            <Home/>*/}
                {this.props.children}

            </div>
        );
    }
}

export default withRouter(App);
