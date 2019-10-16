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
import myMessageList from "./pages/my/myMessageList";
import OthersPerson from "./pages/my/othersIndex";
import OthersInfo from "./pages/my/others/OthersInfo";
import OthersArticles from "./pages/my/others/OthersArticles";
import OthersForum from "./pages/my/others/OthersForum";
import OthersFan from "./pages/my/others/OthersFan";
import OthersFollows from "./pages/my/others/OthersFollows";
import Forum from "./pages/forum";
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
                        <Route path='/person/article'exact component={myArticle}/>
                        <Route path='/person/forum'exact component={myForum}/>
                        <Route path='/person/myFan' exact component={myFan}/>
                        <Route path='/person/myFollows'exact component={myFollows}/>
                        <Route path='/person/info'exact component={Info}/>
                        <Route path='/person/update' component={InfoUpdate}/>
                        <Route path='/person/message' component={myMessageList}/>
                        <Route path='/person/:id'exact  component={OthersPerson}/>
                        <Route path='/person/info/:id' exact component={OthersInfo}/>
                        <Route path='/person/article/:id'exact component={OthersArticles}/>
                        <Route path='/person/forum/:id'exact component={OthersForum}/>
                        <Route path='/person/fan/:id'exact component={OthersFan}/>
                        <Route path='/person/follows/:id'exact component={OthersFollows}/>
                        <Route path='/forum/' exact component={Forum}/>
                        <Route component={NotFound}/>
                        {/*<Redirect form='/*' to='/'/>*/}
                    </Switch>

                </App>
            </HashRouter>
        )
    }
}
export default Router