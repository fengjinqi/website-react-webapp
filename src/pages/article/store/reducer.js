import {ARTILCE_DETAIL,ARTILCE_DEL} from './actionTypes'
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
        case ARTILCE_DEL:
            return {
                ...state,
                list:[]
            }
        default:
            return state
    }

}