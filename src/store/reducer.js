import {combineReducers} from 'redux'
import {reducer as home} from '../pages/home/store'
import {reducer as article} from '../pages/article/store'
import {reducer as my} from '../pages/my/store'
import {reducer as forum} from '../pages/forum/store'
const reducer = combineReducers({
    home,
    article,
    my,
    forum
})


export default reducer
