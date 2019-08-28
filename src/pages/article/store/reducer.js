import {ARTILCE_DETAIL} from './actionTypes'
const defaultState = {
    list:[]
}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case ARTILCE_DETAIL:
            return {
                ...state,
                list:action.data
            }
        default:
            return state
    }

}