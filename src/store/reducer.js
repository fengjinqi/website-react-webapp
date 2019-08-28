import {combineReducers} from 'redux'
import {reducer as home} from '../pages/home/store'
import {reducer as article} from '../pages/article/store'
const reducer = combineReducers({
    home,
    article
})


export default reducer
