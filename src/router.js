import {HashRouter,Switch,Route} from 'react-router-dom'
import React from 'react'
import App from './App'
import Home from './pages/home'
import ArticleDetail from './pages/article/detail'
import Person from './pages/my'
import Login from './pages/login'
import NotFound from './components/NotFound'
import myArticle from './pages/my/myArticle'
import myForum from './pages/my/myForum'
import myFan from "./pages/my/myFan";
import myFollows from "./pages/my/myFollows";
import Info from "./pages/my/myInfo";
import InfoUpdate from "./pages/my/myInfoDe";
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
                        <Route path='/person/article' component={myArticle}/>
                        <Route path='/person/forum' component={myForum}/>
                        <Route path='/person/myFan' component={myFan}/>
                        <Route path='/person/myFollows' component={myFollows}/>
                        <Route path='/person/info' component={Info}/>
                        <Route path='/person/update' component={InfoUpdate}/>

                        <Route component={NotFound}/>
                        {/*<Redirect form='/*' to='/'/>*/}
                    </Switch>

                </App>
            </HashRouter>
        )
    }
}
export default Router