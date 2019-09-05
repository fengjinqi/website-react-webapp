import React from 'react'

class Login extends React.Component{
    componentDidMount() {


        console.log(this.props)
    }
    render() {
        console.log(this.props)
        return (
            <div>
                login
            </div>
        );
    }
}
export  default Login