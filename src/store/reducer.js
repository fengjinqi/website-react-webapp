import {combineReducers} from 'redux'
import {reducer as home} from '../pages/home/store'
import {reducer as article} from '../pages/article/store'
import {reducer as my} from '../pages/my/store'
const reducer = combineReducers({
    home,
    article,
    my
})


export default reducer
