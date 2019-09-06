import {HashRouter,Switch,Route} from 'react-router-dom'
import React from 'react'
import App from './App'
import Home from './pages/home'
import ArticleDetail from './pages/article/detail'
import Person from './pages/my'
import Login from './pages/login'
import NotFound from './components/NotFound'
  class Router extends React.Component{
    render() {
        return(
            <HashRouter>
                <App>

                    <Switch>
                        <Route path='/login/' exact component={Login}/>
                        <Route path='/' exact component={Home}/>
                        <Route path='/article/detail/:id' exact component={ArticleDetail}/>
                        <Route path='/person/' exact component={Person}/>

                        <Route component={NotFound}/>
                        {/*<Redirect form='/*' to='/'/>*/}
                    </Switch>

                </App>
            </HashRouter>
        )
    }
}
export default Router